# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from schematics.models import Model
from schematics.types import (StringType, DateTimeType,
                              IntType, UUIDType, BooleanType)
from schematics.types.compound import ListType, ModelType
from schematics.transforms import blacklist

from caliopen_main.message.parameters.participant import Participant


class Discussion(Model):
    """Existing discussion."""

    user_id = UUIDType()
    discussion_id = UUIDType(required=True)
    date_insert = DateTimeType(serialized_format="%Y-%m-%dT%H:%M:%S.%f+00:00",
                               tzd=u'utc')
    date_update = DateTimeType(serialized_format="%Y-%m-%dT%H:%M:%S.%f+00:00",
                               tzd=u'utc')
    excerpt = StringType(required=True)
    # privacy_index = IntType(required=True, default=0)
    importance_level = IntType(required=True, default=0)
    participants = ListType(ModelType(Participant), default=lambda: [])
    total_count = IntType(required=True, default=0)
    unread_count = IntType(required=True, default=0)
    attachment_count = IntType(default=0)

    class Options:
        roles = {'default': blacklist('user_id')}
        serialize_when_none = False
