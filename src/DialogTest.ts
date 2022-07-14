import powerbi from "powerbi-visuals-api";
import DialogConstructorOptions = powerbi.extensibility.visual.DialogConstructorOptions;

/**
 * This class is used to test the dialog API.
 */
export class DialogTest {
  static id = "DatePickerDialog";

  /**
   * Initialise our dialog and increment the supplied count by 1, in order to
   * confirm that state can be passed between visual and dialog.
   */
  constructor(options: DialogConstructorOptions, initialState: DialogState) {
    const { host, element } = options;
    const new_p: HTMLElement = document.createElement("p");
    const textNode = document.createTextNode(
      "Hi! I am a dialog! You can close me by clicking the button below."
    );
    new_p.appendChild(textNode);
    element.appendChild(new_p);
    host.setResult({
      count: (initialState.count += 1),
    });
  }
}

/**
 * Simple state object for the dialog.
 */
export interface DialogState {
  count: number;
}

/**
 * Register the dialog globally by its ID.
 */
globalThis.dialogRegistry = globalThis.dialogRegistry || {};
globalThis.dialogRegistry[DialogTest.id] = DialogTest;
