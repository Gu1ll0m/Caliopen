// Copyleft (ɔ) 2017 The Caliopen contributors.
// Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
// license (AGPL) that can be found in the LICENSE file.

package backends

import (
	. "github.com/CaliOpen/Caliopen/src/backend/defs/go-objects"
)

type APIStorage interface {
	UserNameStorage
	MessageStorage
	AttachmentStorage
	//identities
	GetLocalsIdentities(user_id string) (identities []LocalIdentity, err error)
	//contacts
	GetContact(user_id, contact_id string) (*Contact, error)
	TagsStorage
	UserStorage
}

type APIIndex interface {
	SetMessageUnread(user_id, message_id string, status bool) error
	CreateMessage(msg *Message) error
	UpdateMessage(msg *Message, fields map[string]interface{}) error
	RecipientsSuggest(user_id, query_string string) (suggests []RecipientSuggestion, err error)
	FilterMessages(search IndexSearch) (messages []*Message, totalFound int64, err error)
	Search(search IndexSearch) (result *IndexResult, err error)
}
