import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Moment from 'react-moment';
import Link from '../../../../components/Link';
import MessageDate from '../../../../components/MessageDate';
import AuthorAvatar from '../../../../components/AuthorAvatar';
import Icon from '../../../../components/Icon';
import TextBlock from '../../../../components/TextBlock';
import Badge from '../../../../components/Badge';
import { renderParticipant } from '../../../../services/message';
import Highlights from '../Highlights';

import './style.scss';

class MessageResultItem extends PureComponent {
  static propTypes = {
    message: PropTypes.shape({}).isRequired,
    term: PropTypes.string.isRequired,
    highlights: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({}).isRequired,
    __: PropTypes.func.isRequired,
  };
  static defaultProps = {
  };

  renderAuthor() {
    const { message: { participants } } = this.props;
    const author = participants.find(participant => participant.type === 'From');

    return renderParticipant(author);
  }

  renderTags() {
    const { message } = this.props;

    return message.tags && message.tags.map(tag => (
      <span key={tag.name}>
        {' '}
        <Badge className="s-message-result-item__tag">{tag.name}</Badge>
      </span>
    ));
  }

  renderHighlights() {
    const { term } = this.props;
    const highlights = Object.entries(this.props.highlights)
      .reduce((acc, [, value]) => [...acc, ...value], [])
      .join(' ... ');

    return (
      <span title={highlights}>
        <Highlights term={term} highlights={highlights} />
      </span>
    );
  }

  render() {
    const { message, settings: { default_locale: locale }, __ } = this.props;

    return (
      <Link
        to={`/discussions/${message.discussion_id}`}
        className={classnames('s-message-result-item', { 's-message-result-item--unread': message.is_unread, 's-message-result-item--draft': message.is_draft })}
        noDecoration
      >
        <div className="s-message-result-item__col-avatars">
          <AuthorAvatar message={message} />
        </div>
        <div className="s-message-result-item__col-title">
          <TextBlock>
            {this.renderAuthor()}
            {this.renderTags()}
          </TextBlock>
          <TextBlock>
            {message.is_draft && (<span className="s-message-result-item__draft-prefix">{__('timeline.draft-prefix')}</span>)}
            {message.subject && (<span className="s-message-result-item__subject">{message.subject}</span>)}
            {this.renderHighlights()}
          </TextBlock>
        </div>
        <div className="s-message-result-item__col-file">
          { message.attachments && <Icon type="paperclip" /> }
        </div>
        <div className="s-message-result-item__col-dates">
          <Moment className="m-message__date" locale={locale} element={MessageDate}>
            {message.date_insert}
          </Moment>
        </div>
      </Link>
    );
  }
}

export default MessageResultItem;
