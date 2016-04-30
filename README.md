# Mermaid Preview

Brackets extension that provides a preview panel and a syntax
highlighter for [Mermaid][].

## About

[Mermaid][] is a JS library that generates flowcharts, sequence diagrams,
and Gantt charts from a text description. This plugin provides a
dynamically updated preview panel to make it easier to create drawings.

The plugin associates files with a `.uml` and `.mermaid` extension with
a Mermaid syntax highlighter. When one of these files is being edited, the
plugin provides a toolbar button and menu entry to open a preview window.
The current contents of the editor are fed through Mermaid to produce a
diagram.

Note that Mermaid has a command-line interface installable through `npm`,
so the envisioned workflow for this plugin is to use this plugin for
development and the command-line interface to generate PNG or SVG. (The
Brackets Live Preview is probably a better workflow for embedding Mermaid 
directly into HTML.)

## Status

While the plugin is usable at the moment, there are some features it would
be nice to see. Pull requests gratefully accepted; otherwise I'll give these
some work as I have opportunity.

* Save function (SVG / PNG). SVG is easiest since we just have to grab the
  content that is already going into the DOM.
* Support for embedded content. It would be especially nice to be able to
  embed a `mermaid` code block into a Markdown document and have it rendered,
  either in a separate panel or in the excellent [Markdown Preview plugin][mp].

Mermaid is embedded with the plugin so it works standalone; the current
version is 0.5.8.

## Preferences

None at present.

## Attribution

Knut Sveidqvist is the primary author of [Mermaid][]. I've now written an
Atlassian Confluence plugin, a Brackets plugin, and a blog post on this tool.
Much appreciated.

[mermaid]:https://github.com/knsv/mermaid
[mp]:https://github.com/gruehle/MarkdownPreview

