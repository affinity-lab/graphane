"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const cron_1 = require("cron");
const fs = __importStar(require("fs"));
const fast_glob_1 = __importDefault(require("fast-glob"));
class Scheduler {
    static make(interval, job, random) { return { interval, job, random }; }
    constructor(path) {
        this.path = path;
        this.jobs = [];
        if (this.path !== undefined)
            this.path = fs.realpathSync(this.path);
    }
    add(interval, job, random) {
        if (random !== undefined) {
            this.jobs.push(new cron_1.CronJob(interval, () => {
                const rnd = Math.floor(Math.random() * random * 1000);
                setTimeout(() => job(), rnd);
            }));
        }
        else {
            this.jobs.push(new cron_1.CronJob(interval, job));
        }
        return true;
    }
    start(delay) {
        if (delay === undefined) {
            this.load();
            this.jobs.map(job => job.start());
            console.log("Job Scheduler started.");
        }
        else {
            setTimeout(() => this.start(), delay * 1000);
        }
    }
    ;
    load() {
        if (this.path !== undefined) {
            const records = fast_glob_1.default.globSync(this.path + "/*.{ts,js}");
            records.map(async (filename) => {
                let module = require(filename).default;
                this.add(module.interval, module.job, module.random);
            });
        }
    }
}
exports.Scheduler = Scheduler;
