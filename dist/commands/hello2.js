"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
class Hello2 extends core_1.Command {
    static args = {
        file: core_1.Args.string({ description: 'file to read' }),
    };
    static description = 'describe the command here';
    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ];
    static flags = {
        // flag with no value (-f, --force)
        force: core_1.Flags.boolean({ char: 'f' }),
        // flag with a value (-n, --name=VALUE)
        name: core_1.Flags.string({ char: 'n', description: 'name to print' }),
    };
    async run() {
        const { args, flags } = await this.parse(Hello2);
        const name = flags.name ?? 'world';
        this.log(`hello ${name} from /home/ashutosh/Documents/freelance/nodejs-oclif-cli/src/commands/hello2.ts`);
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = Hello2;
