import React from 'react';
import { BuilderBlock } from '../../decorators/builder-block.decorator';

export interface ButtonProps {
  attributes?: any;
  text?: string;
}

// TODO: spec all of these as generic builder elements
// and codegen to Vue, React, Angular.........
@BuilderBlock({
  name: 'Form:SubmitButton',
  image:
    'https://cdn.builder.codes/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2Fdf2820ffed1f4349a94c40b3221f5b98',
  defaultStyles: {
    appearance: 'none',
    padding: '10px 5px',
    backgroundColor: '#3898EC',
    color: 'white',
  },
  inputs: [
    {
      name: 'text',
      type: 'text',
    },
  ],
  ...({
    noWrap: true,
  } as any),
  // TODO: optional children? maybe as optional form input
  // that only shows if advanced setting is flipped
  // TODO: defaultChildren
  // canHaveChildren: true,
})
export class ButtonProps extends React.Component<ButtonProps> {
  render() {
    return (
      <button type="submit" {...this.props.attributes}>
        {this.props.text}
      </button>
    );
  }
}
