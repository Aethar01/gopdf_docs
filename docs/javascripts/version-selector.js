document$.subscribe(async () => {
  const header = document.querySelector(".md-header__inner")
  if (!header || header.querySelector("[data-version-selector]")) return

  const config = JSON.parse(document.getElementById("__config").textContent)
  const siteRoot = new URL(`${config.base}/`, location.href)

  let versions
  try {
    const response = await fetch(new URL("versions.json", siteRoot))
    if (!response.ok) return
    versions = await response.json()
  } catch {
    return
  }

  if (!Array.isArray(versions) || versions.length < 2) return

  const rootParts = siteRoot.pathname.split("/").filter(Boolean)
  const directory = rootParts.at(-1)
  const current = versions.find(({ version }) => version === directory)
  const selected = current ?? versions.find(({ aliases = [] }) => aliases.includes("latest")) ?? versions[0]
  const collectionRoot = current ? new URL("../", siteRoot) : siteRoot
  const pagePath = location.pathname.slice(siteRoot.pathname.length)

  const wrapper = document.createElement("div")
  wrapper.className = "md-header__version"
  wrapper.dataset.versionSelector = ""

  const select = document.createElement("select")
  select.className = "md-header__version-select"
  select.setAttribute("aria-label", config.translations["select.version"] ?? "Select version")

  for (const item of versions) {
    const option = document.createElement("option")
    option.value = new URL(`${item.version}/${pagePath}`, collectionRoot)
    option.textContent = item.title
    option.selected = item.version === selected.version
    select.append(option)
  }

  select.addEventListener("change", () => location.assign(select.value))
  wrapper.append(select)
  const palette = header.querySelector("[data-md-component=palette]")
  if (palette) palette.before(wrapper)
  else header.append(wrapper)
})
