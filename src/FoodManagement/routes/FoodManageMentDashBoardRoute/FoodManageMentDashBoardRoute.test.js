import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { AuthServices } from '../../../Authentication/services/AuthServices'
import { AuthStore } from '../../../Authentication/stores/AuthStore'
