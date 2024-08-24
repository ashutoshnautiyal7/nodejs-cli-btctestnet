// src/commands/hello.ts
import { Args, Command, Flags } from "@oclif/core";

export default class Hello extends Command {
	// static override args = {
	// 	arg1: Args.string(),
	// };

    static override flags = {
        flag: Flags.boolean(),
    }

	public async run(): Promise<void> {
		// const { args } = await this.parse(Hello);
        const {flags} = await this.parse(Hello); 
		this.log("Hello from oclif!");
		// this.log("arg1: %s", args.arg1);

        this.log("flag : %s", flags.flag ? "yes" : "no"); 
	}
}