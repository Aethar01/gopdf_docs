# gopdf_docs

Static documentation site for [gopdf](https://github.com/Aethar01/gopdf).

The site is published at [aethar01.github.io/gopdf_docs](https://aethar01.github.io/gopdf_docs/) and contains:

- An overview and configuration guide maintained in this repository
- A reference generated from the current gopdf registries
- Versioned references generated from gopdf release tags

## Local preview

Generate the reference from a neighboring gopdf checkout, then run MkDocs:

```bash
cd ../gopdf
go run ./cmd/builddocs
cp docs/reference.md ../gopdf_docs/docs/reference.md
cd ../gopdf_docs
pip install -r requirements.txt
mkdocs serve
```

The generated `docs/reference.md` and `_site` output are intentionally ignored.

## Automation

The Pages workflow rebuilds when this repository changes, on manual dispatch, and hourly. For immediate rebuilds after a gopdf push or tag, configure a `DOCS_REPO_TOKEN` secret in the gopdf repository with permission to dispatch Actions in `Aethar01/gopdf_docs`.
