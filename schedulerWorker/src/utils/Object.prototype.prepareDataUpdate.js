if (!Object.prototype.prepareDataUpdate) {
  Object.prototype.prepareDataUpdate = function () {
    const $this = this;
    const columns = Object.keys($this);
    const values = columns.map(
      (column) =>
        `${column}=${
          typeof $this[column] === 'boolean'
            ? $this[column]
            : $this[column]
            ? `'${$this[column]}'`.replace(/\\/g, '')
            : 'null'
        }`
    );
    return values.join(', ');
  };
}
