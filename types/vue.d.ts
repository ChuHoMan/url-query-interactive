type Constructor<Signature> = abstract new (...args: any) => Signature

// Remove default vue properties from the component ref instance
type ComponentRef<Component extends Constructor<unknown>> = {
  [Key in keyof InstanceType<Component> as Key extends `$${string}`
    ? never
    : // Remove custom directives
    Key extends `v${Capitalize<string>}`
    ? never
    : Key]: InstanceType<Component>[Key] // Remove vue builtins
}