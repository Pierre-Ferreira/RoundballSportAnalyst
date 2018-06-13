import ContactUsMessages from './collection';

ContactUsMessages.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
