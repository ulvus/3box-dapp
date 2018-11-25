import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  getPublicName,
  getPublicGithub,
  getPublicDescription,
  getPublicLocation,
  getPublicWebsite,
  getPublicEmployer,
  getPublicJob,
  getPublicSchool,
  getPublicDegree,
  getPublicSubject,
  getPublicYear,
  getPublicImage,
  getPrivateEmail,
  getPrivateBirthday,
  getActivity,
} from '../state/actions';

import { address } from '../utils/address';
import { FileSizeModal } from '../components/Modals';
import history from '../history';
import Nav from '../components/Nav';
import * as routes from '../utils/routes';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import Private from '../assets/Private.svg';
import AddImage from '../assets/AddImage.svg';
import Loading from '../assets/Loading.svg';
import './styles/EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      github: '',
      email: '',
      buffer: '',
      description: '',
      location: '',
      website: '',
      birthday: '',
      job: '',
      school: '',
      degree: '',
      subject: '',
      year: '',
      employer: '',
      disableSave: true,
      saveLoading: false,
      removeUserPic: false,
      editPic: false,
      showFileSizeModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      name,
      github,
      email,
      description,
      location,
      website,
      birthday,
      employer,
      job,
      school,
      degree,
      subject,
      year,
    } = this.props;

    this.setState({
      name,
      github,
      email,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      subject,
      year,
      employer,
    });
  }

  componentWillReceiveProps(props) {
    const {
      name,
      github,
      email,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      subject,
      year,
      employer,
    } = props;

    this.setState({
      name,
      github,
      email,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      subject,
      year,
      employer,
    });
  }

  handleFormChange = (e, property) => {
    this.setState({ [property]: e.target.value, disableSave: false });
  }

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  }

  handleUpdatePic = (photoFile, e) => {
    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append('path', photoFile);
      this.setState({
        buffer: formData,
        disableSave: false,
        editPic: true,
        removeUserPic: false,
      });
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  }

  removePic = () => {
    this.setState({ disableSave: false, removeUserPic: true });
  }

  async handleSubmit(e) {
    const {
      name,
      github,
      email,
      removeUserPic,
      buffer,
      editPic,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      subject,
      year,
      employer,
    } = this.state;

    const { box } = this.props;

    if (box.public) {
      e.preventDefault();
      this.setState({ saveLoading: true });

      const nameChanged = name !== this.props.name;
      const githubChanged = github !== this.props.github;
      const emailChanged = email !== this.props.email;
      const descriptionChanged = description !== this.props.description;
      const locationChanged = location !== this.props.location;
      const websiteChanged = website !== this.props.website;
      const employerChanged = employer !== this.props.employer;
      const jobChanged = job !== this.props.job;
      const schoolChanged = school !== this.props.school;
      const degreeChanged = degree !== this.props.degree;
      const subjectChanged = subject !== this.props.subject;
      const yearChanged = year !== this.props.year;
      const birthdayChanged = birthday !== this.props.birthday;

      // if value changed and is not empty, save new value, else remove value
      if (nameChanged && name !== '') await box.public.set('name', name);
      if (nameChanged && name === '') await box.public.remove('name');
      if (githubChanged && github !== '') await box.public.set('github', github);
      if (githubChanged && github === '') await box.public.remove('github');
      if (emailChanged && email !== '') await box.private.set('email', email);
      if (emailChanged && email === '') await box.private.remove('email');
      if (descriptionChanged && description !== '') await box.public.set('description', description);
      if (descriptionChanged && description === '') await box.public.remove('description');
      if (locationChanged && location !== '') await box.public.set('location', location);
      if (locationChanged && location === '') await box.public.remove('location');
      if (websiteChanged && website !== '') await box.public.set('website', website);
      if (websiteChanged && website === '') await box.public.remove('website');
      if (employerChanged && employer !== '') await box.public.set('employer', employer);
      if (employerChanged && employer === '') await box.public.remove('employer');
      if (jobChanged && job !== '') await box.public.set('job', job);
      if (jobChanged && job === '') await box.public.remove('job');
      if (schoolChanged && school !== '') await box.public.set('school', school);
      if (schoolChanged && school === '') await box.public.remove('school');
      if (degreeChanged && degree !== '') await box.public.set('degree', degree);
      if (degreeChanged && degree === '') await box.public.remove('degree');
      if (subjectChanged && subject !== '') await box.public.set('subject', subject);
      if (subjectChanged && subject === '') await box.public.remove('subject');
      if (yearChanged && year !== '') await box.public.set('year', year);
      if (yearChanged && year === '') await box.public.remove('year');
      if (birthdayChanged && birthday !== '') await box.private.set('birthday', birthday);
      if (birthdayChanged && birthday === '') await box.private.remove('birthday');
      if (removeUserPic) await box.public.remove('image');

      // save profile picture
      const fetch = editPic && await window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'post',
        'Content-Type': 'multipart/form-data',
        body: buffer,
      });
      const returnedData = editPic && await fetch.json();
      if (editPic) await box.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': returnedData.Hash } }]);

      // only get values that have changed
      if (nameChanged) await this.props.getPublicName();
      if (githubChanged) await this.props.getPublicGithub();
      if (emailChanged) await this.props.getPrivateEmail();
      if (descriptionChanged) await this.props.getPublicDescription();
      if (locationChanged) await this.props.getPublicLocation();
      if (websiteChanged) await this.props.getPublicWebsite();
      if (employerChanged) await this.props.getPublicEmployer();
      if (jobChanged) await this.props.getPublicJob();
      if (schoolChanged) await this.props.getPublicSchool();
      if (degreeChanged) await this.props.getPublicDegree();
      if (subjectChanged) await this.props.getPublicSubject();
      if (yearChanged) await this.props.getPublicYear();
      if (birthdayChanged) await this.props.getPrivateBirthday();
      if (removeUserPic || editPic) await this.props.getPublicImage();
      this.props.getActivity();

      this.setState({ saveLoading: false });
      history.push(routes.PROFILE);
    }
  }

  render() {
    const { image } = this.props;

    const {
      github,
      email,
      name,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      subject,
      year,
      employer,
      disableSave,
      removeUserPic,
      saveLoading,
      showFileSizeModal,
    } = this.state;

    console.log(this.props.birthday);

    return (
      <div id="edit__page">
        <Nav />
        {saveLoading
          && (
            <div className="container">
              <img src={Loading} alt="loading" id="loadingPic" />
            </div>
          )}

        {showFileSizeModal
          && <FileSizeModal show={showFileSizeModal} closeFileSizeModal={this.closeFileSizeModal} />}

        <div id="edit__breadCrumb">
          <div id="edit__breadCrumb__crumbs">
            <p className="light">
              Edit Profile
            </p>
          </div>
        </div>

        <div id="edit">

          <div id="edit__form">

            <div id="edit__profile">
              <div className="edit__profile__canvas">
                <button
                  id="removePic"
                  className="edit__profil__editCanvas"
                  onClick={this.removePic}
                  disabled={(image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) ? false : true}
                  text="remove"
                  type="button"
                >
                  Edit
                </button>
              </div>

            </div>

            <div id="edit__profile">
              <div className="edit__profile__picAndAddress">
                <div id="edit__userPicture">
                  <label htmlFor="fileInput" id="chooseFile">
                    <input id="fileInput" type="file" name="pic" className="light" accept="image/*" onChange={e => this.handleUpdatePic(e.target.files[0], e)} ref={ref => this.fileUpload = ref} />
                    <img src={AddImage} alt="profile" id="addImage" />

                    {(((image.length > 0 && image[0].contentUrl) || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) && !removeUserPic)
                      ? (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <img className="profPic" src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? URL.createObjectURL(this.fileUpload.files[0]) : `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} alt="profile" />
                        </div>)
                      : (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <div className="profPic" />
                        </div>)}

                  </label>

                  <button
                    id="removePic"
                    className="removeButton"
                    onClick={this.removePic}
                    disabled={(image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) ? false : true}
                    text="remove"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
                <p title={address} className="edit__profile__address">{address && `${address.substring(0, 8)}...`}</p>
              </div>
            </div>

            <div id="edit__profile">

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>Basic</h3>
                  <p>Add basic information so others can recognize you.</p>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Name</h5>
                      </div>
                      <input
                        name="name"
                        type="text"
                        value={name}
                        className="edit__profile__value"
                        onChange={e => this.handleFormChange(e, 'name')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5 className="edit__profile__key">Description</h5>
                      </div>
                      <input
                        name="description"
                        type="text"
                        className="edit__profile__value"
                        value={description}
                        onChange={e => this.handleFormChange(e, 'description')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5 className="edit__profile__key">Spirit Emoji</h5>
                      </div>
                      <div className="edit__profile__value">
                        <select name="spiritEmoji">
                          <option value="unicorn">🦄</option>
                          <option value="whale">🐳</option>
                          <option value="lion">🦁</option>
                          <option value="frog">🐸</option>
                        </select>
                      </div>
                    </div>


                  </div>
                </div>
              </div>

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>About</h3>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Email Address</h5>
                        <img id="edit__profile__input__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                      </div>
                      <input
                        name="email"
                        type="email"
                        className="edit__profile__value privateInput"
                        value={email}
                        onChange={e => this.handleFormChange(e, 'email')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Location</h5>
                      </div>
                      <input
                        name="location"
                        type="text"
                        value={location}
                        className="edit__profile__value"
                        onChange={e => this.handleFormChange(e, 'location')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Website or URL</h5>
                      </div>
                      <input
                        name="website"
                        type="text"
                        className="edit__profile__value"
                        value={website}
                        onChange={e => this.handleFormChange(e, 'website')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5 className="edit__profile__key">Github</h5>
                      </div>
                      <input
                        name="github"
                        type="text"
                        className="edit__profile__value"
                        value={github}
                        onChange={e => this.handleFormChange(e, 'github')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <div id="privateInfo_email" className="edit__profile__key">
                          <h5>Birthday</h5>
                          <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                        </div>
                      </div>
                      <input
                        name="birthday"
                        type="date"
                        className="edit__profile__value"
                        value={birthday}
                        onChange={e => this.handleFormChange(e, 'birthday')}
                      />
                    </div>

                  </div>
                </div>
              </div>

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>Work</h3>
                </div>

                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Employer</h5>
                      </div>
                      <input
                        name="employer"
                        type="text"
                        value={employer}
                        className="edit__profile__value"
                        onChange={e => this.handleFormChange(e, 'employer')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Job Title</h5>
                      </div>
                      <input
                        name="job"
                        type="text"
                        className="edit__profile__value"
                        value={job}
                        onChange={e => this.handleFormChange(e, 'job')}
                      />
                    </div>

                  </div>
                </div>
              </div>

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>Education</h3>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>School</h5>
                      </div>
                      <input
                        name="school"
                        type="text"
                        className="edit__profile__value"
                        value={school}
                        onChange={e => this.handleFormChange(e, 'school')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Degree</h5>
                      </div>
                      <input
                        name="degree"
                        type="text"
                        className="edit__profile__value"
                        value={degree}
                        onChange={e => this.handleFormChange(e, 'degree')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Subject</h5>
                      </div>
                      <input
                        name="subject"
                        type="text"
                        className="edit__profile__value"
                        value={subject}
                        onChange={e => this.handleFormChange(e, 'subject')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Year</h5>
                      </div>
                      <input
                        name="year"
                        type="text"
                        className="edit__profile__value"
                        value={year}
                        onChange={e => this.handleFormChange(e, 'year')}
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>
            <div id="edit__formControls">
              <div id="edit__formControls__content">
                <button type="submit" disabled={disableSave} onClick={e => this.handleSubmit(e)}>Save</button>
                <Link to="/Profile" className="subtext" id="edit__cancel">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

EditProfile.propTypes = {
  box: PropTypes.object,
  name: PropTypes.string,
  github: PropTypes.string,
  year: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  birthday: PropTypes.instanceOf(Date),
  job: PropTypes.string,
  school: PropTypes.string,
  degree: PropTypes.string,
  subject: PropTypes.string,
  employer: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.array,
  ifFetchingThreeBox: PropTypes.bool,

  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getPrivateBirthday: PropTypes.func,
  getPublicWebsite: PropTypes.func,
  getPublicEmployer: PropTypes.func,
  getPublicJob: PropTypes.func,
  getPublicSchool: PropTypes.func,
  getPublicDegree: PropTypes.func,
  getPublicSubject: PropTypes.func,
  getPublicYear: PropTypes.func,
  getPublicLocation: PropTypes.func,
  getPublicDescription: PropTypes.func,
  getActivity: PropTypes.func,
};

EditProfile.defaultProps = {
  box: {},
  name: '',
  github: '',
  description: '',
  location: '',
  website: '',
  birthday: '',
  job: '',
  school: '',
  degree: '',
  subject: '',
  year: '',
  employer: '',
  email: '',
  image: [],
  ifFetchingThreeBox: false,

  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicDescription: getPublicDescription(),
  getPublicLocation: getPublicLocation(),
  getPublicWebsite: getPublicWebsite(),
  getPublicEmployer: getPublicEmployer(),
  getPublicJob: getPublicJob(),
  getPublicSchool: getPublicSchool(),
  getPublicDegree: getPublicDegree(),
  getPublicSubject: getPublicSubject(),
  getPublicYear: getPublicYear(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getPrivateBirthday: getPrivateBirthday(),
  getActivity: getActivity(),
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    name: state.threeBox.name,
    github: state.threeBox.github,
    description: state.threeBox.description,
    location: state.threeBox.location,
    website: state.threeBox.website,
    birthday: state.threeBox.birthday,
    job: state.threeBox.job,
    school: state.threeBox.school,
    degree: state.threeBox.degree,
    subject: state.threeBox.subject,
    year: state.threeBox.year,
    employer: state.threeBox.employer,
    email: state.threeBox.email,
    image: state.threeBox.image,
    ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
  };
}

export default withRouter(connect(mapState,
  {
    getPublicName,
    getPublicGithub,
    getPublicDescription,
    getPublicLocation,
    getPublicWebsite,
    getPublicEmployer,
    getPublicJob,
    getPublicSchool,
    getPublicDegree,
    getPublicSubject,
    getPublicYear,
    getPublicImage,
    getPrivateEmail,
    getPrivateBirthday,
    getActivity,
  })(EditProfile));

        // if value has changed, switch boolean to save to db
      // let nameChanged = false;
      // let githubChanged = false;
      // let emailChanged = false;
      // name === this.props.name ? nameChanged = false : nameChanged = true;
      // github === this.props.github ? githubChanged = false : githubChanged = true;
      // email === this.props.email ? emailChanged = false : emailChanged = true;