/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    "use strict";

    var CommandManager     = brackets.getModule("command/CommandManager"),
        EditorManager      = brackets.getModule("editor/EditorManager"),
        ExtensionUtils     = brackets.getModule("utils/ExtensionUtils"),
        Menus              = brackets.getModule("command/Menus"),
        WorkspaceManager   = brackets.getModule("view/WorkspaceManager"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        _                  = brackets.getModule("thirdparty/lodash");

    var Strings = require("strings"),
        Mermaid = require("mermaid"),
        _previewTemplate = require("text!templates/mermaid-preview.html");
    
    var cmdPreview, previewPanel, $icon, document, panelShown = false;
    
    require('syntax');
    
    function populateView(content) {
        if (previewPanel && content) {
            previewPanel.$panel.find("#mermaid-content").html("");
            Mermaid.mermaidAPI.render('preview-svg', content, function (svgGraph) {
                if (previewPanel) {
                    previewPanel.$panel.find("#mermaid-content").html(svgGraph);
                }
            }, "#mermaid-preview");
        }
    }
    
    function documentDeleted(event) {
        document = null;
    }
    
    function documentChanged(event, doc, changeList) {
        if (previewPanel && panelShown && doc) {
            populateView(doc.getText(false));
        }
    }
    
    var _debounceDocumentChanged = _.debounce(documentChanged, 300);
    
    function toggleView() {
        if (!previewPanel) {
            var templateVars = {
                Strings: Strings
            };
            var panelHtml = Mustache.render(_previewTemplate, templateVars);
            previewPanel = WorkspaceManager.createBottomPanel("mermaid-preview", $(panelHtml), 200);
        }
        if (panelShown) {
            previewPanel.hide();
            cmdPreview.setChecked(false);
            panelShown = false;
        } else {
            previewPanel.show();
            cmdPreview.setChecked(true);
            panelShown = true;
            _debounceDocumentChanged(null, document, null);
        }
        $icon.toggleClass('on', panelShown);
    }
    
    function activeEditorChangeHandler(event, activeEditor, previousEditor) {
        if (document) {
            document.off("change", _debounceDocumentChanged);
            document.off("deleted", documentDeleted);
            document.releaseRef();
            document = null;
        }
        var mode = null;
        if (activeEditor && activeEditor.document) {
            mode = activeEditor._getModeFromDocument();
        }
        if (mode === "mermaid") {
            $icon.show();
            cmdPreview.setEnabled(true);
            if (previewPanel && panelShown) {
                previewPanel.show();
            }
            document = activeEditor.document;
            document.on("change", _debounceDocumentChanged);
            document.on("deleted", documentDeleted);
            document.addRef();
            _debounceDocumentChanged(null, document, null);
        } else {
            $icon.hide();
            cmdPreview.setEnabled(false);
            if (previewPanel && panelShown) {
                previewPanel.hide();
            }
        }
    }
    
    Mermaid.initialize({
        cloneCssStyles: false,
        startOnLoad: false
    });
    
    var VIEW_COMMAND_ID = "alanhohn.mermaidpreview";
    
    $icon = $("<a id='mermaid-preview-icon' href='#'></a>");
    $icon.appendTo($("#main-toolbar .buttons"));
    $icon.on("click", toggleView);
    
    cmdPreview = CommandManager.register(Strings.MENU_PREVIEW, VIEW_COMMAND_ID, toggleView);
    var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
    menu.addMenuItem(VIEW_COMMAND_ID);

    ExtensionUtils.loadStyleSheet(module, "styles/mermaid.css");

    activeEditorChangeHandler(null, EditorManager.getActiveEditor(), null);
    EditorManager.on("activeEditorChange", activeEditorChangeHandler);

});
