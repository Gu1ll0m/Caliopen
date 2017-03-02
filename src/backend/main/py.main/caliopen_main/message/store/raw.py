# -*- coding: utf-8 -*-
"""Caliopen storage model for messages."""
from __future__ import absolute_import, print_function, unicode_literals

import uuid

from cassandra.cqlengine import columns

from caliopen_storage.store.model import BaseModel


class RawMessage(BaseModel):

    """Raw message model."""

    raw_msg_id = columns.UUID(primary_key=True, default=uuid.uuid4)
    data = columns.Bytes()
    size = columns.Integer() # number of bytes in 'data' column

class UserRawLookup(BaseModel):

    """User's raw message pointer."""

    user_id = columns.UUID(primary_key=True)
    raw_msg_id = columns.UUID(primary_key=True)
