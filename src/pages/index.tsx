import * as React from 'react'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { StateTree } from '../state/createStore'
import { Dog } from '../state/dogs'
import fetchDogs from '../actions/fetchDogs'
import Image from '../components/Image'

interface PageDog extends Dog {
  index: number
}

interface StateProps {
  dogs: Array<PageDog>
}

interface DispatchProps {
  fetchDogs: () => void
}

type PageProps = StateProps & DispatchProps

export class Page extends React.PureComponent<PageProps> {
  componentDidMount () {
    this.props.fetchDogs()
  }

  render () {
    const { dogs, fetchDogs }: PageProps = this.props
    return (
      <div>
        {dogs.map(({ url, loading, index, type }: PageDog) =>
          <div key={index} style={{ display: 'inline-block' }}>
            {loading &&
              <div className='test-loading-placeholder'>
                is loading
              </div>
            }
            {!loading &&
              <Image
                url={url}
                type={type}
                />
            }
          </div>
        )}
        <button onClick={fetchDogs}> get more dogs </button>
      </div>
    )
  }
}

export const mapStateToProps = ({
  dogs: { dogs }
}: StateTree): StateProps => {
  return {
    dogs: Object.keys(dogs).map((key: string) => {
      const index = parseInt(key, 10)
      return {
        ...dogs[index],
        index
      }
    })
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps =>
  bindActionCreators({
    fetchDogs
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Page)
