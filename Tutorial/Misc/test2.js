

function cleanUserBio(profile) {
    username = profile.username;
    bio = profile.bio;

    tr_bio = bio.trim();    
    lcase_bio = tr_bio.toLowerCase();
    rep_bio = lcase_bio.replace("javascript","js"); 
    count = rep_bio.length;

    tr_usr = username.trim();    
    lcase_usr = tr_usr.toLowerCase();
    rep_usr = lcase_usr.replace("javascript","js"); 
    

    return [rep_usr, rep_bio];

}

function usrbio(name,bio) {
    len_bio = bio.length;
    console.log(`\n User Name : ${name}\n Bio : ${bio}\n Length of bio : ${len_bio} `)

}

const userProfile = {
    username : "CoolUser99",
    bio : " I LOVE coding! JavaScript is Great!!! "
}

const [usr_name, usr_bio] = cleanUserBio(userProfile);

usrbio(usr_name,usr_bio);
