import {InputGuardian} from "./input-guardian";
import {graphane} from "../../graphane/graphane";


graphane.addResolverDecoratorBefore(InputGuardian);

console.log("Input Guardian plugin initialized.");
