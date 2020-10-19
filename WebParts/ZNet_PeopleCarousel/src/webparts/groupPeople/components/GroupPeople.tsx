import * as React from 'react';
import styles from './GroupPeople.module.scss';
import filmStripStyles from './../components/filmstripLayout/FilmstripLayout.module.scss';
import { IGroupPeopleProps } from './IGroupPeopleProps';
import {
  Log, Environment, EnvironmentType,
} from '@microsoft/sp-core-library';
import { Persona } from 'office-ui-fabric-react/lib/Persona';
import PeopleCard from '../models/PeopleCard';
import { FilmstripLayout } from './../components/filmstripLayout/FilmstripLayout';
import * as strings from 'GroupPeopleWebPartStrings';

/** Group People UI
 * @class
 * @extends
 */
export default class GroupPeople extends React.Component<IGroupPeopleProps, {}> {

  /** Toggle Title state
   * @private
   */
  private _toggleTitle: string = '';

  /** Display a message if no People to display and if don't hide webpart
   * @private
   */
  private _displayDefaultMessage: string = '';

  /** Default constructor
   * @param props 
   */
  constructor(props: IGroupPeopleProps) {
    super(props);
    this._toggleTitle = props.displayTitle ? '' : filmStripStyles.hidden;
  }

  /** Default render
   * @returns HTML Template
   * @public
   */
  public render(): JSX.Element {
    this._toggleTitle = this.props.displayTitle ? '' : filmStripStyles.hidden;
    this._displayDefaultMessage = (this.props.users.length == 0 && !this.props.hide) ? '' : styles.hidden;
    return (
      <div className={filmStripStyles.filmStrip}>
        <h2 className={[filmStripStyles.title, this._toggleTitle].join(' ')} role="heading">{this.props.title}</h2>
        {this.props.users.length == 0 && !this.props.hide &&

          <div className={['grpPeopleNoItem', this._displayDefaultMessage].join(' ')}>{strings.NoItemFound}</div>

        }

        <FilmstripLayout
          ariaLabel={"Sample filmstrip layout web part, showing sample items., Use right and left arrow keys to navigate between cards in the film strip."}
        >

          {this.props.users.map((p: PeopleCard) => {
            return (
              // <div className={filmStripStyles.personaTile} key={p.key}>
              <Persona
                text={p.lineOne}
                secondaryText={p.lineTwo}
                tertiaryText={p.lineThree}
                imageUrl={p.image}
                size={140}
                className={filmStripStyles.persona}
                coinSize={140}
              />
              // </div>
            );
          })}

        </FilmstripLayout>
      </div>

    );
  }
}
