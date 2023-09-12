import {InputGuardian} from "./input-guardian";
import {graphane} from "../../graphane/graphane";


graphane.addResolverDecorator(InputGuardian);

console.log("☑️ Input Guardian plugin initialized.");
