import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class CloudNodeProvider implements vscode.TreeDataProvider<CloudNode> {
  constructor(private workspaceRoot: string | undefined) {}
  private _onDidChangeTreeData: vscode.EventEmitter<CloudNode | undefined> = new vscode.EventEmitter<
    CloudNode | undefined
  >();
  readonly onDidChangeTreeData: vscode.Event<CloudNode | undefined> = this._onDidChangeTreeData.event;

  getTreeItem(element: CloudNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: CloudNode | undefined): vscode.ProviderResult<CloudNode[]> {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage('No cloud in empty workspace.');
      return Promise.resolve([]);
    }
    if (element) return Promise.resolve(null);

    return Promise.resolve([
      new CloudNode('Javascript', '深入一点-a', vscode.TreeItemCollapsibleState.None),
      new CloudNode('Javascript', '深入一点-b', vscode.TreeItemCollapsibleState.None),
      new CloudNode('Javascript', '深入一点-c', vscode.TreeItemCollapsibleState.None),
      new CloudNode('Javascript', '深入一点-d', vscode.TreeItemCollapsibleState.None),
    ]);
  }
}

export class CloudNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private name: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label}-${this.name}`;
  }

  get description(): string {
    return this.label;
  }

  contextValue = 'cloudNode';

  iconPath = {
    light: path.join(__filename, '..', '..', 'resource', 'light', 'gist-secret.svg'),
    dark: path.join(__filename, '..', '..', 'resource', 'dark', 'gist-secret.svg'),
  };

}
