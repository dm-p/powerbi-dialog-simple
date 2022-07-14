"use strict";
import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { VisualSettings } from "./settings";
// Dialog-specific stuff
import DialogAction = powerbi.DialogAction;
import DialogOpenOptions = powerbi.extensibility.visual.DialogOpenOptions;
import RectSize = powerbi.extensibility.visual.RectSize;
import VisualDialogPosition = powerbi.extensibility.visual.VisualDialogPosition;
import VisualDialogPositionType = powerbi.VisualDialogPositionType;
import ModalDialogResult = powerbi.extensibility.visual.ModalDialogResult;
import { DialogTest, DialogState } from "./DialogTest";

export class Visual implements IVisual {
  private target: HTMLElement;
  private updateCount: number;
  private settings: VisualSettings;
  private textNode: Text;
  private host: IVisualHost;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.target = options.element;
    this.host = options.host;
    this.updateCount = 0;
    if (document) {
      const new_p: HTMLElement = document.createElement("p");
      new_p.appendChild(
        document.createTextNode(
          "Click the visual to open dialog. Dialog open count: "
        )
      );
      const new_em: HTMLElement = document.createElement("em");
      this.textNode = document.createTextNode(this.updateCount.toString());
      new_em.appendChild(this.textNode);
      new_p.appendChild(new_em);
      this.target.appendChild(new_p);
      // bind simple dialog handling to main element (click)
      this.handleDialogEvent();
    }
  }

  public update(options: VisualUpdateOptions) {
    this.settings = Visual.parseSettings(
      options && options.dataViews && options.dataViews[0]
    );
    console.log("Visual update", options);
  }

  /**
   * Binds logic to the click event for the main element. This will open a
   * simple dialog and pass in the current update count.
   */
  private handleDialogEvent() {
    this.target.onclick = (event) => {
      const dialogActionButtons = [DialogAction.OK];
      const dialogStateInitial: DialogState = { count: this.updateCount };
      const position: VisualDialogPosition = {
        type: VisualDialogPositionType.RelativeToVisual,
        left: 100,
        top: 30,
      };
      const size: RectSize = { width: 250, height: 300 };
      const dialogOptions: DialogOpenOptions = {
        actionButtons: dialogActionButtons,
        size: size,
        position: position,
        title: `Test Dialog`,
      };
      this.host
        .openModalDialog(DialogTest.id, dialogOptions, dialogStateInitial)
        .then((ret) => this.handleDialogResult(ret));
    };
  }

  /**
   * When the dialog is closed, we will udpate the current count value returned
   * from the dialog logic.
   */
  private handleDialogResult(ret: ModalDialogResult): void {
    const count = (<DialogState>ret.resultState).count;
    this.updateCount = count;
    this.textNode.textContent = `${count}`;
  }

  private static parseSettings(dataView: DataView): VisualSettings {
    return <VisualSettings>VisualSettings.parse(dataView);
  }

  /**
   * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
   * objects and properties you want to expose to the users in the property pane.
   *
   */
  public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    );
  }
}
