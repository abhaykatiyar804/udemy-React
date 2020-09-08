import jsonPlaceholder from '../api/jsonPlaceholder'
import _ from 'lodash'

export const fetchPostAndUser = () => async (dispatch, getState) => {

    await dispatch(fetchPost())
    // const userIds = _.uniq(_.map(getState().post, 'userId'))
    // userIds.forEach(id => dispatch(fetchUser(id)))

    _.chain(getState().post).map('userId')
        .uniq()
        .forEach(id=>dispatch(fetchUser(id)))
        .value()
        

}

export const fetchPost = () => async dispatch => {

    const response = await jsonPlaceholder.get('/posts')
    dispatch({ type: 'FETCH_POST', payload: response.data })
}

export const fetchUser = (id) => async dispatch => {

    const response = await jsonPlaceholder.get(`/users/${id}`)
    dispatch({ type: 'FETCH_USER', payload: response.data })
}




// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch)

// }

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({ type: 'FETCH_USER', payload: response.data })

// })
