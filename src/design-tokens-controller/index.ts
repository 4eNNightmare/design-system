import { ReactiveController, ReactiveControllerHost } from "lit";
import {DesignTokens, buildDesignTokens, BuildDesignTokensParams} from '../utils/design_tokens'

export class DesignTokensController implements ReactiveController, DesignTokens {
  host: ReactiveControllerHost;
  colors: DesignTokens["colors"];


  constructor(host: ReactiveControllerHost, params: BuildDesignTokensParams) {
    (this.host = host).addController(this);
    const tokens = buildDesignTokens(params);
    this.colors = tokens.colors;
  }

  hostConnected() {
    console.log("hostConnected");
  }

  hostDisconnected() {
    console.log("hostDisconnected");
  }
}