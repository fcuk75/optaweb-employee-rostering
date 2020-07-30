/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState } from 'react';
import { Button, Popover } from '@patternfly/react-core';
import { BlockPicker } from 'react-color';
import Color from 'color';


export const defaultColorList = [
  // Patternfly Red

  '#7d1007', // Dark Red
  '#a30000', // Red
  '#c9190b', // Light Red

  // Patternfly Blue

  '#2b9af3', // Dark Blue
  '#73bcf7', // Blue
  '#bee1f4', // Light Blue

  // Patternfly Yellow

  '#f4c145', // Dark yellow
  '#f6d173', // Yellow
  '#f9e0a2', // Light Yellow

  // Patternfly Orange

  '#ec7a08', // Dark Orange
  '#ef9234', // Orange
  '#f4b678', // Light Orange

  // Patternfly Green

  '#6ec664', // Dark Green
  '#95d58e', // Green
  '#bde5b8', // Light Green

  // Patternfly Purple

  '#a18fff', // Dark Purple
  '#b2a3ff', // Purple
  '#cbc1ff', // Light Purple

  // Patternfly Cyan

  '#a2d9d9', // Dark Cyan
  '#73c5c5', // Cyan
  '#009596', // Light Cyan
];

export function getColor(color: string): Color {
  if (color.startsWith('var')) {
    // CSS variable
    return Color(getComputedStyle(document.documentElement)
      .getPropertyValue(color.substring(4, color.length - 1)).trim());
  }

  return Color(color);
}

export interface ColorPickerProps {
  isDisabled?: boolean;
  currentColor: string;
  onChangeColor: (newColor: string) => void;
}
export const StatefulColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [color, setColor] = useState(props.currentColor);
  React.useEffect(() => {
    setColor(props.currentColor);
  }, [setColor, props.currentColor]);

  return (
    <ColorPicker
      isDisabled={props.isDisabled}
      onChangeColor={(newColor) => {
        setColor(newColor);
        props.onChangeColor(newColor);
      }}
      currentColor={color}
    />
  );
};
export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isVisible={isOpen && !props.isDisabled}
      aria-label="Select Color..."
      shouldClose={() => setIsOpen(false)}
      bodyContent={(
        <BlockPicker
          color={props.currentColor}
          colors={defaultColorList.map(color => getColor(color).hex())}
          onChange={(color) => {
            props.onChangeColor(color.hex);
          }}
          triangle="hide"
        />
      )}
    >
      <Button
        style={{
          width: '100%',
          backgroundColor: props.currentColor,
          color: getColor(props.currentColor).isLight() ? 'black' : 'white',
        }}
        onClick={() => setIsOpen(true)}
        isDisabled={props.isDisabled}
      >
        {props.currentColor}
      </Button>
    </Popover>
  );
};
