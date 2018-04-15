import * as React from 'react'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { StateTree } from '../state/createStore'
import { Dog } from '../state/dogs'
import fetchDogs from '../actions/fetchDogs'
import Image from '../components/Image'
import {
  Button,
  Grid,
  GridColumn,
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

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
      <Container className='mt30'>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Dogs
          </Header.Content>
          <Header.Subheader>
            <div className='mb10'>Click the button to load more dogs!</div>
            <Button primary onClick={fetchDogs}>Get more dogs</Button>
          </Header.Subheader>
        </Header>

        <Grid stackable columns={4}>
          {dogs.map(({ url, loading, index, type }: PageDog) =>
            <GridColumn key={index}>
              <Segment loading={loading} compact padded={false}>
                <Image
                  url={url}
                  type={type}
                  />
              </Segment>
            </GridColumn>
          )}
        </Grid>
      </Container>
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
