# shaddy.dev

Source for [shaddy.dev](https://shaddy.dev), built with [Hugo](https://gohugo.io)
and deployed to GitHub Pages by `.github/workflows/main.yml` on every push to `master`.

The layouts and styles started out as a fork of
[hugo-blog-awesome](https://github.com/hugo-sid/hugo-blog-awesome)
(see `shaddy.dev/LICENSE-hugo-blog-awesome`) and now live directly in the site.

## Development

```sh
nix develop                 # or let direnv load the flake
cd shaddy.dev
hugo server -D              # -D also renders drafts
hugo new notes/some-idea.md # starts as a draft
```

Set `draft = false` (or delete the line) to publish a page.

The "page history" section on each page comes from `scripts/generate-git-history.py`,
which CI runs before building; run it locally to preview it.
