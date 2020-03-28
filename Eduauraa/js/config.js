const username = "cbsei6";
const password = "cbse6@123";
var token = username + ":" + password;
var hash = "Basic " + btoa(token);

export const token_ = hash;//get token from username and pasword
export const faqURL = 'http://staging.eduauraa.com/global_faq_list';
export const mailURL = 'http://staging.eduauraa.com/website/pushwebdata';
