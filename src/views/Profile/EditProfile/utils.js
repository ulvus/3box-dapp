export const twitterMessage = (did, ethAddr) => {
  return (`This Tweet links my Twitter account to my 3Box profile! 
  %0D%0A%0D%0A${`https://3box.io/${ethAddr}`}
  %0D%0A%0D%0AWeb3 social profiles by @3boxdb
  %0D%0A✅
  %0D%0A${did}
  %0D%0A✅`);
};

export const githubMessage = (did) => {
  return (`This post links my 3Box profile to my Github account! Web3 social profiles by 3Box.
    
  ✅ ${did} ✅
    
    Create your profile today to start building social connection and trust online at https://3Box.io/`);
};

export const checkVerifiedFormatting = (value, field) => {
  let isValid;
  const isEmail = field === 'email';
  const isGithub = field === 'github';
  const isTwitter = field === 'twitter';

  if (isEmail) {
    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = emailCheck.test(String(value).toLowerCase());
  } else if (isTwitter) {
    isValid = /^@?(\w){1,15}$/.test(value);
  } else if (isGithub) {
    isValid = /\B@([a-z0-9](?:-?[a-z0-9]){0,38})$/.test(value);
  }
  return isValid;
};

export const capitalizeFirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}