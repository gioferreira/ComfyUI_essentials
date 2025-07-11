import { app } from "/scripts/app.js";

// This extension will be loaded by ComfyUI
app.registerExtension({
    name: "Comfy.Essentials.DynamicWidgets",

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        // Check if the current node is the one we want to modify
        if (nodeData.name === "LorasForFluxParams+") {
            
            // Get the original onNodeCreated function to chain it
            const onNodeCreated = nodeType.prototype.onNodeCreated;

            // Override onNodeCreated to add our logic
            nodeType.prototype.onNodeCreated = function () {
                // Call the original function
                onNodeCreated?.apply(this, arguments);

                const maxLoras = 10; // This must match the Python code

                // Find the widget that controls the number of LoRAs
                const numLorasWidget = this.widgets.find(w => w.name === "num_loras");

                // This function shows/hides widgets based on the current count
                const updateWidgetVisibility = () => {
                    const numToShow = numLorasWidget.value;

                    for (let i = 1; i <= maxLoras; i++) {
                        // Find the widgets for the current LoRA slot
                        const loraWidget = this.widgets.find(w => w.name === `lora_${i}`);
                        const strengthWidget = this.widgets.find(w => w.name === `strength_${i}`);

                        // Determine if the widget should be visible
                        const shouldBeVisible = i <= numToShow;
                        
                        // Set the hidden property
                        if (loraWidget) loraWidget.hidden = !shouldBeVisible;
                        if (strengthWidget) strengthWidget.hidden = !shouldBeVisible;
                    }
                    
                    // Request the node to re-evaluate its size to fit the new widget layout
                    this.computeSize(); 
                };

                // Add a callback to the 'num_loras' widget.
                // This function will be executed whenever the widget's value changes.
                if (numLorasWidget) {
                    numLorasWidget.callback = () => {
                        updateWidgetVisibility();
                    };
                }

                // Run the visibility update once when the node is first created to set the initial state.
                // A small timeout ensures all widgets are fully initialized before we manipulate them.
                setTimeout(updateWidgetVisibility, 10);
            };
        }
    },
});
