/********************************************************************************
 * Copyright (c) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { ContainerModule } from "inversify";
import { TYPES } from "../../base/types";
import { ManhattanEdgeRouter } from "./manhattan-edge-router";
import { PolylineEdgeRouter } from "./polyline-edge-router";
import { ManhattanRectangularAnchor, ManhattanEllipticAnchor, ManhattanDiamondAnchor } from "./manhattan-anchors";
import { RectangleAnchor, EllipseAnchor, DiamondAnchor } from "./polyline-anchors";
import { AnchorComputerRegistry } from "./anchor";
import { EdgeRouterRegistry } from "./routing";
import { AddRemoveBezierSegmentCommand, BezierEdgeRouter } from './bezier-edge-router';
import { BezierDiamondAnchor, BezierEllipseAnchor, BezierRectangleAnchor } from './bezier-anchors';
import { configureCommand } from "../../base/commands/command-registration";

const routingModule = new ContainerModule((bind, _unbind, isBound) => {
    bind(EdgeRouterRegistry).toSelf().inSingletonScope();

    bind(AnchorComputerRegistry).toSelf().inSingletonScope();

    bind(ManhattanEdgeRouter).toSelf().inSingletonScope();
    bind(TYPES.IEdgeRouter).toService(ManhattanEdgeRouter);
    bind(TYPES.IAnchorComputer).to(ManhattanEllipticAnchor).inSingletonScope();
    bind(TYPES.IAnchorComputer).to(ManhattanRectangularAnchor).inSingletonScope();
    bind(TYPES.IAnchorComputer).to(ManhattanDiamondAnchor).inSingletonScope();

    bind(PolylineEdgeRouter).toSelf().inSingletonScope();
    bind(TYPES.IEdgeRouter).toService(PolylineEdgeRouter);
    bind(TYPES.IAnchorComputer).to(EllipseAnchor);
    bind(TYPES.IAnchorComputer).to(RectangleAnchor);
    bind(TYPES.IAnchorComputer).to(DiamondAnchor);

    bind(BezierEdgeRouter).toSelf().inSingletonScope();
    bind(TYPES.IEdgeRouter).toService(BezierEdgeRouter);
    bind(TYPES.IAnchorComputer).to(BezierEllipseAnchor);
    bind(TYPES.IAnchorComputer).to(BezierRectangleAnchor);
    bind(TYPES.IAnchorComputer).to(BezierDiamondAnchor);

    configureCommand({ bind, isBound }, AddRemoveBezierSegmentCommand);
});

export default routingModule;
