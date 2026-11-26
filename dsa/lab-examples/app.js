'use strict';
for (const kind of ['checklist', 'calculation', 'table', 'stepper']) {
  PlaygroundComponents.mount('#' + kind, referenceConfig(kind, kind));
}
