"use client";

import { Button } from "@/components/ui/button";
import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    EdgeProps,
    useReactFlow,
} from "@xyflow/react";

export default function DeleteableEdge({
    id,
    markerEnd,
    style,
    ...edgeProps
}: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath(edgeProps);

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={style}
            />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: "all",
                    }}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-5 w-5 rounded-full text-xs hover:shadow-lg"
                        onClick={() =>
                            setEdges((eds) => eds.filter((e) => e.id !== id))
                        }
                    >
                        ×
                    </Button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
