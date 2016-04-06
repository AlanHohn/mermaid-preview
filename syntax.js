/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";

    var CodeMirror      = brackets.getModule("thirdparty/CodeMirror/lib/codemirror"),
        LanguageManager = brackets.getModule("language/LanguageManager");
    
    CodeMirror.defineSimpleMode("mermaid", {
        start: [
            {regex: /%%.*/, token: "comment"},
            {regex: /^\w*(graph|subgraph|sequenceDiagram|participant|Note|loop|end|alt|opt|gantt|title|section|dateFormat|click|classDef|class|TB|LR|default|left of|right of|over)/, token: "keyword"},
            {regex: /".*"/, token: "string"},
            {regex: /\[.*\]/, token: "string"},
            {regex: /\(.*\)/, token: "string"},
            {regex: /\{.*\}/, token: "string"},
            {regex: />.*\]/, token: "string"},
            {regex: /\|.*\|/, token: "string"},
            {regex: /#[0-9a-fxA-FX]+/, token: "number"},
            {regex: /[\-\.=<>:]+/, token: "atom"}
        ],
        meta: {
            lineComment: "%%"
        }
    });
    
    LanguageManager.defineLanguage("mermaid", {
        name: "Mermaid UML",
        mode: "mermaid",
        fileExtensions: ["mermaid", "uml"],
        lineComment: ['%%']
    });
    
});
