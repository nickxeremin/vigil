import { Module } from "@nestjs/common"

import { ComponentController } from "./component.controller"

@Module({ controllers: [ComponentController] })
export class ComponentModule {}
