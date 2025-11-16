# 📋 ngx-better-forms

Better, cleaner, and more maintainable reactive form utilities for Angular.

![status](https://img.shields.io/badge/status-experimental-orange?style=flat-square)
[![Build](https://github.com/bioroxx/ngx-better-forms/actions/workflows/test-lib.yml/badge.svg)](https://github.com/bioroxx/ngx-better-forms/actions/workflows/test-lib.yml)
[![npm version](https://img.shields.io/npm/v/ngx-better-forms?logo=npm&style=flat-square)](https://www.npmjs.com/package/ngx-better-forms)
[![License](https://img.shields.io/github/license/bioroxx/ngx-better-forms?style=flat-square)](LICENSE)

---

## 🚀 Features

- 🧩 Conditional validators for complex reactive forms
- ⚡ Utility methods to simplify control management
- 🧪 100% unit tested


## 📘 Documentation

[https://bioroxx.github.io/ngx-better-forms](https://bioroxx.github.io/ngx-better-forms)


## 📦 Installation

```bash
npm install @ngx-better-forms/better-forms
```

## 💡 Example Usage

See short examples below.

You can find a full feature showcase in the [documentation](https://bioroxx.github.io/ngx-better-forms).

### Conditional Validators

Add validators to a target `FormControl`, based on the current value of another FormControl.

```ts
formGroup = this.formBuilder.group(
  {
    field1: new FormControl<string>(''),
    target: new FormControl<string>(''),
  },
  {
    validators: [
      BetterValidation.conditionalValidators({
        targetControlPath: 'target',
        targetValidators: [Validators.required],
        conditions: [
          {
            controlPath: 'field1',
            testValues: ['a', 'b'],
          },
        ],
      }),
    ],
  },
);
```

### Conditional Disable

```ts
formGroup = this.formBuilder.group(
  {
    field1: new FormControl<string>(''),
    target: new FormControl<string>(''),
  },
  {
    validators: [
      BetterDisable.conditionalDisable({
        targetControlPath: 'target',
        conditions: [
          {
            controlPath: 'field1',
            testValues: ['a', 'b'],
          },
        ],
      }),
    ],
  },
);
```
> ⚠️ **Disclaimer:**  
> This library is currently in very early development.  
> Features, APIs, and behavior may change without notice — use with caution, but be inspired. ✨
