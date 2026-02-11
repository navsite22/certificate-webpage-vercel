import User from "../Schema/user.js"

//find the certificate in database and send the found to the backend to frontend
export const verifyCertificate = async (req, res) => {
  try{
    const { certificateNo } = req.params;

    if(!certificateNo){
      return res.status(400).json({
        success: false,
        message: 'Certificate number is required',
      });
    }

    const certificate = await User.findOne({
      certificateNo: certificateNo.trim(),
    });

    if(!certificate){
      return res.status(400).json({
        success: false,
        message: 'Certificate not found.',
      });
    }

    res.status(200).json({
      success: true,
      certificateNo: certificate.certificateNo,
      fatherName: certificate["Father's Name"],
      contribution: certificate.Contribution,
      modeOfContribution: certificate["Mode of Contribution"],
    });
  }
  catch (error) {
    console.error('Error verifying certificate: ', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while verifying certificate',
    });
  }
};

//to fetch all certificates at once
export const getAllCertificates = async (req, res) => {
  try{
    const certificates = await User.find({});
    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  }
  catch (error){
    console.error('Error fetching certificates:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificates.',
    });
  }
};