import React, { useEffect, useState } from "react";
import _, { result, xor, xorWith } from "lodash";

function Art(props: { gameState: any }) {
	var initialArt = props.gameState.game.map(() =>
		new Array(props.gameState.game.length).fill(0)
	);

	const [art, setArt] = useState(initialArt);

	var indices = _.cloneDeep(art);

	indices.forEach((pixelGroup: any[], index: number) => {
		pixelGroup.forEach((pixel: any, i: number) => {
			pixelGroup[i] = index * pixelGroup.length + i;
		});
	});

	function toBooleans(input: string) {
		var result = [];
		for (var i = 0; i < input.length; i++) {
			if (input[i] === "0") {
				result.push(false);
			} else if (input[i] === "1") {
				result.push(true);
			}
		}
		return result;
	}

	function xorShift(a: boolean[], b: boolean[]) {
		var complexity = 8;
		var loopedA = [];
		var i = 0;
		while (loopedA.length < complexity) {
			if (i < a.length) {
				loopedA.push(a[i]);
				i++;
			} else if (i === a.length) {
				i = 0;
			}
		}
		var loopedB = [];
		i = 0;
		while (loopedB.length < complexity) {
			if (i < b.length) {
				loopedB.push(b[i]);
				i++;
			} else if (i === b.length) {
				i = 0;
			}
		}

		var shifted = [];
		i = 0;
		while (i < complexity) {
			if ((loopedA[i] && loopedB[i]) || (!loopedA[i] && !loopedB[i])) {
				shifted.push(false);
			} else {
				shifted.push(true);
			}
			i++;
		}

		return shifted;
	}

	function toDecimal(binary: boolean[]) {
		var result = 0;
		binary.forEach((bit, index) => {
			if (bit) {
				result = result + 2 ** index;
			}
		});

		return result;
	}

	var newArt = _.cloneDeep(art);
	var gap =
		props.gameState.updatedAt.getTime() -
		props.gameState.createdAt.getTime();

	var arts: number[] = [];

	newArt.forEach((pixelGroup: any[], index: number) => {
		pixelGroup.forEach((pixel: any, i: number) => {
			arts.push(
				toDecimal(
					xorShift(
						toBooleans(indices[index][i].toString(2)),
						toBooleans(gap.toString(2).padStart(8, "0"))
					)
				)
			);
		});
	});

	console.log(arts);

	indices.forEach((pixelGroup: any[], index: number) => {
		pixelGroup.forEach((pixel: any, i: number) => {
			pixelGroup[i] = arts[index * pixelGroup.length + i];
		});
	});

	useEffect(() => {
		if (!_.isEqual(indices, art)) {
			setArt(indices);
		}
	}, [indices, art]);

	return (
		<div className="canvas">
			{art.map((gamePixels: any[], index: number) => (
				<div className="pixel-group" key={index}>
					{gamePixels.map((pixel: any, i: number) => (
						<div className="pixel" key={i}>
							{pixel}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Art;
