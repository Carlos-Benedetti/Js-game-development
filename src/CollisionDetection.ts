import { GameArea } from "./GameArea";
import { GenericCanvasComponent } from "./GenericCanvasComponent";
import { promises } from "dns";
import { staticVariables } from "./args";

export class CollisionDetection {
    testComponent(component: GenericCanvasComponent<any,any>) {
        return new Promise(resolve => {
            const x = component.x
            const y = component.y
            const width = component.width
            const height = component.height
            staticVariables.gameArea.components.forEach((object2, i, k) => {

                if ((object2.id !== component.id) || component.x < object2.x + object2.width && component.x + component.width > object2.x &&
                    component.y < object2.y + object2.height && component.y + component.height > object2.y) {
                    resolve(true)
                } else if ((i + 1) === k.length) {
                    resolve(false)
                }

            })
        })
    }
}