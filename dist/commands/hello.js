"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/commands/hello.ts
const core_1 = require("@oclif/core");
class Hello extends core_1.Command {
    // static override args = {
    // 	arg1: Args.string(),
    // };
    static flags = {
        flag: core_1.Flags.boolean(),
    };
    async run() {
        // const { args } = await this.parse(Hello);
        const { flags } = await this.parse(Hello);
        this.log("Hello from oclif!");
        // this.log("arg1: %s", args.arg1);
        this.log("flag : %s", flags.flag ? "yes" : "no");
    }
}
exports.default = Hello;
