export class IncrementalMap<T> {
  private data: { [key: string]: T } = {}; //{keyName: keyValue}
  private snapshots: { [id: number]: { [key: string]: T } } = {}; // {keyName : {subKeyName: subKeyValue}}

  set(key: string, value: T): void {
    this.data[key] = value;
  }

  get(key: string): T | undefined {
    return this.data[key];
  }
  snapshot(id: number): void {
    const snapshot = {};
    for (const key in this.data) {
      if (!this.data[key]) {
        continue;
      }
      snapshot[key] = this.data[key];
    }
    this.snapshots[id] = snapshot;
  }
  loadSnapshot(id: number): void {
    const snapshot = this.snapshots[id];
    if (!snapshot) {
      return;
    }
    for (const key in snapshot) {
      if (!Object.prototype.hasOwnProperty.call(snapshot, key)) {
        continue;
      }
      if (this.data[key] !== snapshot[key]) {
        this.data[key] = snapshot[key];
      }
    }
  }
}
