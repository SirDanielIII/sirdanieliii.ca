# Writing guides with MDX

The Guides section is a library for recipes, tutorials, blog posts, and other resources. MDX lets you write Markdown and optionally use React components in the same article. This uses the official [MDX Vite integration](https://mdxjs.com/docs/getting-started/#vite), with GitHub-style tables, task lists, and automatic heading IDs.

## Add an article

Create one `.mdx` file in a category folder under `src/pages/guides/content/`:

```text
content/
  recipes/moms-shrimp.mdx
  tutorials/my-tutorial.mdx
  blog/my-post.mdx
  resources/my-resource.mdx
```

Folders can be created when needed. Use lowercase filenames with hyphens. The path becomes the URL: `tutorials/my-tutorial.mdx` appears at `/guides/tutorials/my-tutorial`. Files are discovered automatically; no route or card registration is needed. Renaming a file changes its URL.

Start with this:

```mdx
export const meta = {
    title: 'My useful guide',
    description: 'A short description for the card and article introduction.',
    tags: ['Example', 'Getting started'],
    author: 'Daniel',
}

An introduction goes here. The page already displays your title, so start sections at heading level two.

## What you need

- First thing
- Second thing

## Steps

1. Do this.
2. Then do that.

<Callout title="A useful tip">

You can mix **Markdown** with custom React components. Leave blank lines inside the component when writing Markdown.

</Callout>
```

The `meta` export is ordinary JavaScript, not YAML frontmatter. Required fields are `title` and `description`. Optional fields:

| Field | Use |
| --- | --- |
| `tags` | Array of topics; all are searchable, first three appear on cards |
| `author` | Attribution, such as `爸爸 / Dad` |
| `time` | Free text, such as `About 20 minutes` or `5 min read` |
| `servings` | Optional recipe yield or batch size |
| `order` | Lower numbers appear first; unspecified entries sort by title after explicitly ordered entries |

Every MDX file in these folders is published at build time. Keep unfinished drafts outside `content/`. MDX supports JavaScript, so these files must be trusted source code, not visitor uploads.

## Markdown, images, and components

- Use Markdown links, headings, lists, blockquotes, fenced code blocks, and tables. Heading level two populates “On this page” automatically.
- Use `/guides/recipes/moms-shrimp` for a link to another guide; internal links use the site router.
- For public images, place a file under `public/guides/` and write `![Describe the image](/guides/my-image.webp)`. For bundled assets, import the image and use `<img src={photo} alt="Describe the image" />`.
- `Callout` is available in every article. Define shared components in `src/pages/guides/mdxComponents.tsx` and add them to the `mdxComponents` map in `GuideArticle.tsx`, or import a specific component directly into an MDX file.
- Search covers titles, descriptions, and tags. Filters live in the URL so browser Back and shared links preserve them.
- Print uses a simplified article layout, hiding navigation and related guides.

## Where to edit the UI

- `src/pages/guides/guides.ts`: categories, metadata rules, and article discovery.
- `src/pages/guides/GuidesPage.tsx`: library and filters.
- `src/pages/guides/GuideArticle.tsx`: article layout and section navigation.
- `src/css/guides/`: all guides styling, including Markdown and print styles.

Run `npm run dev` to preview, and `npm run build` before deploying. The compiler runs at build time; visitors do not download an MDX compiler. The guides section is loaded separately from the home page. Article modules are currently bundled together within that section, which keeps this small collection simple.

The family recipes preserve approximate measurements and timing. Temperature and raw-meat handling clarifications are labelled in the recipes and link to their sources; confirm any uncertain family measurements before treating them as exact.
