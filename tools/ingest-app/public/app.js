const proposalForm = document.getElementById("proposal-form")
const applyForm = document.getElementById("apply-form")
const proposalPanel = document.getElementById("proposal-panel")
const proposalSummary = document.getElementById("proposal-summary")
const proposalRationale = document.getElementById("proposal-rationale")
const proposalCommit = document.getElementById("proposal-commit")
const selectedTopics = document.getElementById("selected-topics")
const relatedArticles = document.getElementById("related-articles")
const warningsBox = document.getElementById("warnings")
const filesContainer = document.getElementById("files")
const topicsList = document.getElementById("topics-list")
const categoryRail = document.getElementById("category-rail")
const applyResult = document.getElementById("apply-result")
const proposalButton = document.getElementById("proposal-button")
const applyButton = document.getElementById("apply-button")
const loadFileButton = document.getElementById("load-file-button")
const fileLoadStatus = document.getElementById("file-load-status")

let currentProposalId = null
let isApplying = false

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function renderTopics(topics) {
  if (categoryRail) {
    categoryRail.innerHTML = topics
      .map(
        (topic) => `
          <a class="category-card" href="https://danyel-ii.github.io/cyber-research-wiki/${escapeHtml(topic.filePath.replace(/^wiki\//, "").replace(/\.md$/, ""))}">
            <strong>${escapeHtml(topic.title)}</strong>
            <p>${escapeHtml(topic.role)}</p>
          </a>
        `,
      )
      .join("")
  }

  topicsList.innerHTML = topics
    .map(
      (topic) => `
        <label class="topic-option">
          <input type="checkbox" name="categories" value="${escapeHtml(topic.id)}" />
          <span class="topic-option-body">
            <strong>${escapeHtml(topic.title)}</strong>
            <span>${escapeHtml(topic.summary)}</span>
            <code>${escapeHtml(topic.role)}</code>
          </span>
        </label>
      `,
    )
    .join("")
}

function renderProposal(proposal) {
  currentProposalId = proposal.id
  isApplying = false
  proposalPanel.classList.remove("hidden")
  proposalSummary.textContent = proposal.summary
  proposalRationale.textContent = proposal.rationale
  proposalCommit.textContent = proposal.commitMessage
  selectedTopics.innerHTML = proposal.categoryIds.map((id) => `<span class="chip">${escapeHtml(id)}</span>`).join("")
  relatedArticles.innerHTML =
    proposal.relatedArticleSlugs.length > 0
      ? proposal.relatedArticleSlugs.map((slug) => `<span class="chip">${escapeHtml(slug)}</span>`).join("")
      : `<span class="chip muted">No related articles yet</span>`

  if (proposal.warnings.length > 0) {
    warningsBox.classList.remove("hidden")
    warningsBox.innerHTML = proposal.warnings.map((warning) => `<p>${escapeHtml(warning)}</p>`).join("")
  } else {
    warningsBox.classList.add("hidden")
    warningsBox.innerHTML = ""
  }

  filesContainer.innerHTML = proposal.files
    .map(
      (file) => `
        <article class="file-card">
          <div class="file-head">
            <strong>${escapeHtml(file.path)}</strong>
            <span class="pill ${file.changeType}">${escapeHtml(file.changeType)}</span>
          </div>
          <pre>${escapeHtml(file.diff || "(No textual diff produced)")}</pre>
        </article>
      `,
    )
    .join("")
}

async function loadTopics() {
  const response = await fetch("/api/topics")
  const data = await response.json()
  renderTopics(data.topics)
}

async function loadFileIntoForm() {
  const filePathInput = document.getElementById("file-path")
  const requestedPath = filePathInput.value.trim()

  if (!requestedPath) {
    window.alert("Enter a local file path first.")
    return
  }

  loadFileButton.disabled = true
  loadFileButton.textContent = "Loading…"
  fileLoadStatus.textContent = ""

  try {
    const response = await fetch("/api/load-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath: requestedPath }),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || "File load failed")
    }

    document.getElementById("title").value = data.title || ""
    document.getElementById("summary").value = data.summary || ""
    document.getElementById("body").value = data.body || ""
    filePathInput.value = data.filePath || requestedPath
    fileLoadStatus.textContent = `Loaded ${data.filePath}`
  } catch (error) {
    fileLoadStatus.textContent = ""
    window.alert(error.message)
  } finally {
    loadFileButton.disabled = false
    loadFileButton.textContent = "Load file"
  }
}

proposalForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  proposalButton.disabled = true
  proposalButton.textContent = "Generating…"
  applyResult.classList.add("hidden")
  currentProposalId = null
  isApplying = false
  applyButton.disabled = false
  applyButton.textContent = "Approve and write to git"

  const categories = [...document.querySelectorAll('input[name="categories"]:checked')].map((input) => input.value)

  try {
    const response = await fetch("/api/propose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        slug: document.getElementById("slug").value,
        summary: document.getElementById("summary").value,
        body: document.getElementById("body").value,
        references: document.getElementById("references").value,
        categories,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || "Proposal request failed")
    }
    renderProposal(data.proposal)
  } catch (error) {
    window.alert(error.message)
  } finally {
    proposalButton.disabled = false
    proposalButton.textContent = "Generate proposal"
  }
})

applyForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  if (!currentProposalId || isApplying) return

  isApplying = true
  applyButton.disabled = true
  applyButton.textContent = "Writing…"

  try {
    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        proposalId: currentProposalId,
        commit: document.getElementById("commit").checked,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || "Apply request failed")
    }

    applyResult.classList.remove("hidden")
    applyResult.innerHTML = `
      <p>Applied ${data.paths.length} file change(s).</p>
      <p>${data.commitSha ? `Commit: <code>${escapeHtml(data.commitSha)}</code>` : "No commit created."}</p>
    `
    currentProposalId = null
    applyButton.textContent = "Applied"
  } catch (error) {
    window.alert(error.message)
    isApplying = false
  } finally {
    if (currentProposalId) {
      applyButton.disabled = false
      applyButton.textContent = "Approve and write to git"
    } else {
      applyButton.disabled = true
    }
  }
})

loadFileButton.addEventListener("click", loadFileIntoForm)

loadTopics()
