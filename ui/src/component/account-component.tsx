import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { userStore } from '../store';
import { observer } from 'mobx-react';
import Parse from 'parse';
import { debounce } from 'lodash';

const saveChanges = debounce(() => {
  userStore.loggedInUser?.save().then();
}, 2000);

export const AccountComponent = observer(() => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formUpdateImageDisplay">
          <Image
            src={
              userStore.loggedInUser &&
              userStore.loggedInUser.get('picture').url()
            }
            rounded
            thumbnail
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formUpdateImage">
          <Form.Label>Change Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            placeholder="Enter Name"
            onChange={async (e) => {
              const fileUploadControl = e.target;
              // @ts-ignore
              if (fileUploadControl.files.length > 0) {
                // @ts-ignore
                const file = fileUploadControl.files[0];
                const name = 'profile-picture.jpg';
                const parseFile = new Parse.File(name, file);
                await parseFile.save();
                if (userStore.loggedInUser) {
                  await userStore.loggedInUser.set('picture', parseFile).save();
                }
              }
            }}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formUpdateName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={userStore.loggedInUser?.get('name')}
          type="text"
          placeholder="Enter Name"
          onChange={(e) => {
            userStore.loggedInUser?.set('name', e.target.value);
            saveChanges();
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUpdateAbout">
        <Form.Label>About</Form.Label>
        <Form.Control
          as={'textarea'}
          style={{ maxHeight: '100px', minHeight: '100px' }}
          placeholder="About me..."
          value={userStore.loggedInUser?.get('about')}
          onChange={(e) => {
            userStore.loggedInUser?.set('about', e.target.value);
            saveChanges();
          }}
        />
      </Form.Group>

      <hr />

      <Form.Group className="mb-3" controlId="formUpdateEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          defaultValue={
            userStore.loggedInUser && userStore.loggedInUser.get('email')
          }
          type="email"
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUpdatePassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUpdateConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" multiple placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Change Password
      </Button>
    </Form>
  );
});
