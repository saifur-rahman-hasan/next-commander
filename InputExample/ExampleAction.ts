import BaseAction from "@/core/BaseAction"

export default class ExampleAction extends BaseAction {
    async execute() {
        console.log('Action Fired!!!')
    }
}