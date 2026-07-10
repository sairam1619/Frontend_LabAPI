function LabDetailsPage() {
  const labs = [
    {
      id: 1,
      name: "IAM Users, Groups, and Policies",
      subtitle: "Secure S3 Access with IAM",
      overview:
        "Learn how to implement secure access control using AWS Identity and Access Management (IAM) for an Amazon S3 bucket. Create an S3 bucket, configure an IAM group with a custom read-only policy, add an IAM user to the group, generate AWS CLI access keys, and verify permissions by performing allowed and restricted S3 operations.",
      objectives: [
        "Learn to create an IAM user group and assign users to it, ensuring group-based access control.",
        "Understand how to generate AWS access keys for an IAM user and configure AWS CLI to interact with AWS resources.",
        "Learn how to test access control by listing, downloading, and attempting to upload objects to an S3 bucket using AWS CLI.",
      ],
      services: ["IAM", "S3", "AWS CLI"],
      sections: [
        {
          title: "Create an S3 Bucket and Upload Files",
          objective:
            "Create an Amazon S3 bucket and upload sample files for permission testing.",
          tasks: [
            "Create an S3 bucket",
            "Upload a sample file",
            "Verify the uploaded object",
          ],
          outcome:
            "An S3 bucket is ready with sample content for access control testing.",
        },
        {
          title: "Create an IAM User Group",
          objective:
            "Create an IAM user group to manage permissions centrally.",
          tasks: ["Create an IAM user group", "Review the group configuration"],
          outcome: "The IAM user group is ready for permission assignment.",
        },
        {
          title: "Create a Read-Only IAM Policy",
          objective:
            "Create a custom IAM policy that grants read-only access to an Amazon S3 bucket.",
          tasks: [
            "Create a custom IAM policy",
            "Allow ListBucket permission",
            "Allow GetObject permission",
          ],
          outcome: "A read-only IAM policy is ready for assignment.",
        },
        {
          title: "Attach the IAM Policy to the User Group",
          objective: "Assign the custom IAM policy to the IAM user group.",
          tasks: [
            "Open the IAM user group",
            "Attach the custom IAM policy",
            "Verify the assigned permissions",
          ],
          outcome: "All users in the group inherit the assigned permissions.",
        },
        {
          title: "Create an IAM User",
          objective: "Create an IAM user and add it to the IAM user group.",
          tasks: [
            "Create an IAM user",
            "Add the user to the IAM group",
            "Review inherited permissions",
          ],
          outcome: "The IAM user inherits the group's permissions.",
        },
        {
          title: "Generate Access Keys and Test Access",
          objective: "Configure AWS CLI and validate the assigned permissions.",
          tasks: [
            "Generate access keys",
            "Configure AWS CLI",
            "List bucket objects",
            "Download an object",
            "Attempt to upload an object",
          ],
          outcome: "Read operations succeed while write operations are denied.",
        },
      ],
      issues: [
        "AccessDenied errors while accessing the S3 bucket.",
        "Incorrect IAM policy attachment to the Developers group.",
        "AWS CLI configured with invalid or incorrect access credentials.",
      ],
    },

    {
      id: 2,
      name: "IAM Roles for EC2 - Secure Access to DynamoDB Without Access Keys",
      subtitle: "Secure DynamoDB Access Without Access Keys",
      overview:
        "A DynamoDB table is created to store blog data, and a custom IAM policy allows Scan and GetItem operations while denying PutItem. The policy is attached to an IAM role that is assigned to an Amazon EC2 instance. After verifying the role attachment and installing AWS CLI, read operations succeed while write operations are denied, demonstrating secure least-privilege access to the DynamoDB table.",
      objectives: [
        "Learn how to implement a custom IAM policy that allows only read operations on the DynamoDB table while explicitly denying write operations.",
        "Learn how to execute AWS CLI commands to query (Scan, GetItem) and attempt restricted actions (PutItem).",
        "Understand how to launch an EC2 instance, configure its security settings, and establish an SSH connection to execute DynamoDB queries.",
      ],
      services: ["IAM", "EC2", "DynamoDB", "AWS CLI", "CloudWatch"],
      sections: [
        {
          title: "Create a DynamoDB Table",
          objective:
            "Create an Amazon DynamoDB table and populate it with sample data.",
          tasks: [
            "Create a DynamoDB table",
            "Configure the partition key",
            "Insert sample items",
            "Verify the stored data",
          ],
          outcome:
            "A DynamoDB table is created with sample records for access testing.",
        },
        {
          title: "Create a Read-Only IAM Policy",
          objective:
            "Create a custom IAM policy that allows read access while denying write operations.",
          tasks: [
            "Create a custom IAM policy",
            "Allow Scan and GetItem actions",
            "Deny PutItem action",
          ],
          outcome: "A least-privilege IAM policy is ready for assignment.",
        },
        {
          title: "Create an IAM Role for Amazon EC2",
          objective:
            "Create an IAM role that grants the EC2 instance secure access to DynamoDB.",
          tasks: [
            "Create an IAM role",
            "Select EC2 as the trusted service",
            "Attach the custom IAM policy",
            "Attach CloudWatch permissions",
          ],
          outcome: "An IAM role is available for secure EC2 access.",
        },
        {
          title: "Launch an Amazon EC2 Instance",
          objective: "Launch an EC2 instance and attach the IAM role.",
          tasks: [
            "Launch an EC2 instance",
            "Configure networking and security",
            "Attach the IAM role",
            "Start the instance",
          ],
          outcome: "The EC2 instance is running with the assigned IAM role.",
        },
        {
          title: "Verify Access Using AWS CLI",
          objective:
            "Verify IAM role permissions by performing allowed and restricted DynamoDB operations.",
          tasks: [
            "Connect to the EC2 instance",
            "Verify the attached IAM role",
            "Install AWS CLI",
            "Run Scan and GetItem operations",
            "Attempt a PutItem operation",
          ],
          outcome:
            "Read operations succeed while write operations are denied, confirming least-privilege access.",
        },
      ],
      issues: [
        "AccessDenied errors due to incorrect IAM policy permissions.",
        "IAM role not attached or incorrectly attached to the EC2 instance.",
        "AWS CLI commands fail because the IAM role or instance metadata is not configured correctly.",
      ],
    },

    {
      id: 3,
      name: "Restrict IAM Users from Accessing RDS Unless Connecting from a Specific IP",
      subtitle: "Secure Amazon RDS Access with IP Restrictions",
      overview:
        "An Amazon RDS MySQL database is deployed in a private subnet, and its credentials are securely stored in AWS Secrets Manager. A custom IAM policy is created to allow access to the secret only from a specific IP address and is attached to an IAM user. Access is verified using AWS CLI, confirming that the secret can be retrieved from the allowed IP while requests from other locations are denied.",
      objectives: [
        "Learn how to launch an Amazon RDS instance with AWS Secrets Manager integration.",
        "Learn how to test access by running AWS CLI commands to list and retrieve secrets while verifying IP-based restrictions.",
        "Learn how to create and attach IAM policies that control access based on specific conditions such as source IP addresses.",
      ],
      services: ["IAM", "RDS", "Secrets Manager", "AWS CLI"],
      sections: [
        {
          title: "Create an IAM User and Configure AWS CLI",
          objective:
            "Create an IAM user, generate access keys, and configure AWS CLI for authentication.",
          tasks: [
            "Create an IAM user",
            "Generate access keys",
            "Configure AWS CLI",
            "Retrieve the public IP address",
          ],
          outcome:
            "An IAM user is ready for secure authentication using AWS CLI.",
        },
        {
          title: "Create an Amazon RDS Database",
          objective:
            "Launch a private Amazon RDS MySQL database for secure access.",
          tasks: [
            "Create an RDS MySQL database",
            "Configure networking settings",
            "Create a security group",
            "Record the database connection details",
          ],
          outcome: "A private Amazon RDS database is deployed and available.",
        },
        {
          title: "Store Database Credentials in AWS Secrets Manager",
          objective:
            "Securely store the Amazon RDS database credentials in AWS Secrets Manager.",
          tasks: [
            "Create a new secret",
            "Store database credentials",
            "Associate the secret with the RDS database",
          ],
          outcome:
            "Database credentials are securely stored in AWS Secrets Manager.",
        },
        {
          title: "Create an IAM Policy with IP Restrictions",
          objective:
            "Create an IAM policy that allows Secrets Manager access only from a specific IP address.",
          tasks: [
            "Create a custom IAM policy",
            "Configure source IP conditions",
            "Allow read access to Secrets Manager",
          ],
          outcome:
            "An IAM policy restricts access based on the client's IP address.",
        },
        {
          title: "Attach the Policy and Verify Access",
          objective:
            "Validate that Secrets Manager access is allowed only from the approved IP address.",
          tasks: [
            "Attach the IAM policy to the user",
            "List available secrets",
            "Retrieve the stored secret",
            "Test access from an unauthorized IP",
          ],
          outcome:
            "Access succeeds from the allowed IP and is denied from other locations.",
        },
      ],
      issues: [
        "Access is denied because the request originates from an unauthorized IP address.",
        "Secrets Manager operations fail due to incorrect IAM policy permissions.",
        "AWS CLI authentication fails because of invalid or incorrectly configured access keys.",
      ],
    },

    {
      id: 4,
      name: "Implementing Multi-Factor Authentication (MFA) for Enhanced IAM Security",
      subtitle: "Enhanced IAM Security with MFA",
      overview:
        "An IAM user group and user are created with restricted permissions and AWS Management Console access. Multi-Factor Authentication (MFA) is configured for the user, and IAM policies are applied to require MFA for Amazon EC2 operations. Access is verified by testing EC2 actions before and after generating temporary MFA session credentials, demonstrating how MFA strengthens authentication and protects AWS resources.",
      objectives: [
        "Learn how to create an IAM user, enable AWS Management Console access, and set a custom password.",
        "Understand how to create and attach IAM policies that restrict EC2 actions unless MFA authentication is present.",
        "Learn how to request session tokens and use them to authenticate AWS CLI operations.",
        "Understand how to test permissions by attempting EC2 actions with and without MFA.",
      ],
      services: ["IAM", "EC2", "AWS CLI"],
      sections: [
        {
          title: "Create an IAM User Group",
          objective:
            "Create an IAM user group for users requiring Multi-Factor Authentication.",
          tasks: [
            "Create an IAM user group",
            "Configure the group without permissions",
          ],
          outcome:
            "An IAM user group is ready for MFA-based access management.",
        },
        {
          title: "Create an IAM User and Add It to the Group",
          objective:
            "Create an IAM user with console access and assign it to the user group.",
          tasks: [
            "Create an IAM user",
            "Enable AWS Management Console access",
            "Set a custom password",
            "Add the user to the IAM group",
          ],
          outcome:
            "An IAM user is configured with console access and group membership.",
        },
        {
          title: "Enable Multi-Factor Authentication (MFA)",
          objective: "Configure Multi-Factor Authentication for the IAM user.",
          tasks: [
            "Assign an MFA device",
            "Register an authenticator application",
            "Verify MFA setup",
          ],
          outcome:
            "The IAM user is protected with Multi-Factor Authentication.",
        },
        {
          title: "Create IAM Policies to Enforce MFA",
          objective:
            "Create IAM policies that require MFA for Amazon EC2 access while allowing essential IAM and session operations.",
          tasks: [
            "Create an MFA enforcement policy",
            "Create a user access policy",
            "Configure policy permissions",
          ],
          outcome:
            "IAM policies enforce MFA-based access to protected resources.",
        },
        {
          title: "Attach Policies to the User Group",
          objective: "Apply the IAM policies to the user group.",
          tasks: [
            "Attach the MFA enforcement policy",
            "Attach the user access policy",
          ],
          outcome: "Group members inherit the required MFA security policies.",
        },
        {
          title: "Verify MFA-Protected Access",
          objective:
            "Validate AWS Management Console login and AWS CLI access using MFA.",
          tasks: [
            "Sign in to the AWS Management Console",
            "Test Amazon EC2 access without MFA",
            "Generate temporary session credentials",
            "Verify Amazon EC2 access using MFA",
          ],
          outcome:
            "Amazon EC2 operations succeed only after authenticating with MFA.",
        },
      ],
      issues: [
        "MFA device is not configured or generates invalid verification codes.",
        "EC2 operations fail because temporary MFA session credentials are not used.",
        "IAM policies are incorrectly attached or do not enforce MFA conditions.",
      ],
    },

    {
      id: 5,
      name: "Implementing Temporary S3 Access with AWS STS AssumeRole",
      subtitle: "Temporary S3 Access Using AWS STS",
      overview:
        "An Amazon S3 bucket is created to store private files, and an IAM policy grants read-only access to the bucket. The policy is attached to an IAM role with a custom trust policy that allows it to be assumed using AWS STS. Temporary security credentials are generated through AWS CLI to access the bucket, where object listing and downloads succeed while unauthorized operations, such as listing all S3 buckets, are denied according to the IAM policy.",
      objectives: [
        "Learn how to create and configure an Amazon S3 bucket, ensuring that public access is blocked and files are securely uploaded.",
        "Understand how to create an IAM role with a custom trust policy that allows entities within the AWS account to assume the role using AWS STS.",
        "Learn how to export the temporary credentials as environment variables to enable AWS CLI commands to authenticate successfully.",
        "Learn how to verify access by listing and downloading objects from the S3 bucket using the temporary credentials.",
      ],
      services: ["STS", "IAM", "S3", "AWS CLI"],
      sections: [
        {
          title: "Create an Amazon S3 Bucket",
          objective:
            "Create a private Amazon S3 bucket and upload files for secure access.",
          tasks: [
            "Create an Amazon S3 bucket",
            "Block public access",
            "Upload a sample file",
          ],
          outcome:
            "A private Amazon S3 bucket is ready for temporary access testing.",
        },
        {
          title: "Create an IAM Policy",
          objective:
            "Create an IAM policy that provides read-only access to the Amazon S3 bucket.",
          tasks: [
            "Create a custom IAM policy",
            "Allow ListBucket permission",
            "Allow GetObject permission",
          ],
          outcome:
            "An IAM policy grants read-only access to the Amazon S3 bucket.",
        },
        {
          title: "Create an IAM Role for AWS STS",
          objective:
            "Configure an IAM role with a trust policy that can be assumed using AWS STS.",
          tasks: [
            "Create an IAM role",
            "Configure the trust policy",
            "Attach the Amazon S3 access policy",
          ],
          outcome:
            "An IAM role is ready to provide temporary access through AWS STS.",
        },
        {
          title: "Assume the Role and Verify Temporary Access",
          objective:
            "Generate temporary credentials and validate Amazon S3 access using AWS CLI.",
          tasks: [
            "Assume the IAM role using AWS STS",
            "Export temporary credentials",
            "Verify caller identity",
            "List and download Amazon S3 objects",
            "Test restricted Amazon S3 permissions",
          ],
          outcome:
            "Temporary credentials allow only the permitted Amazon S3 operations while unauthorized actions are denied.",
        },
      ],
      issues: [
        "AssumeRole operation fails because of an incorrect trust policy.",
        "Temporary credentials expire or are not exported correctly to the AWS CLI environment.",
        "AccessDenied errors occur due to missing IAM policy permissions.",
      ],
    },
    {
      id: 6,
      name: "IAM Security Best Practices & Access Analysis",
      subtitle: "Credential Reports and IAM Access Analyzer",
      overview:
        "An IAM user and user group are created with Amazon S3 read-only permissions, and an Amazon S3 bucket is configured with public access for security analysis. IAM credential reports are generated before and after enabling access keys and console access to observe security changes. IAM Access Analyzer is then used to identify publicly accessible resources and perform unused access analysis, helping evaluate security risks and improve AWS resource management.",
      objectives: [
        "Learn how to generate an IAM credential report and analyze it to check the status of access keys, MFA, and password policies.",
        "Learn to compare credential reports before and after making access changes to observe and understand their impact on security.",
        "Understand how to use IAM Access Analyzer to scan AWS resources and identify publicly accessible resources.",
        "Learn how to perform an unused access analysis to detect AWS resources that have not been used for the past 90 days.",
      ],
      services: ["IAM", "IAM Access Analyzer", "S3"],
      sections: [
        {
          title: "Create an Amazon S3 Bucket",
          objective:
            "Create an Amazon S3 bucket with public access for security analysis.",
          tasks: [
            "Create an Amazon S3 bucket",
            "Disable Block Public Access",
            "Review bucket configuration",
          ],
          outcome: "An Amazon S3 bucket is available for access analysis.",
        },
        {
          title: "Create an IAM User and User Group",
          objective:
            "Create an IAM user and assign Amazon S3 read-only permissions through a user group.",
          tasks: [
            "Create an IAM user",
            "Create an IAM user group",
            "Add the user to the group",
            "Attach AmazonS3ReadOnlyAccess",
          ],
          outcome:
            "The IAM user receives Amazon S3 read-only permissions through the group.",
        },
        {
          title: "Generate and Analyze Credential Reports",
          objective:
            "Generate IAM credential reports and compare security changes after enabling user credentials.",
          tasks: [
            "Download the initial credential report",
            "Create access keys",
            "Enable console access",
            "Download and compare the updated credential report",
          ],
          outcome:
            "Credential reports reflect changes in user authentication and access settings.",
        },
        {
          title: "Create IAM Access Analyzer",
          objective:
            "Use IAM Access Analyzer to identify public access risks and analyze unused access.",
          tasks: [
            "Create an IAM Access Analyzer",
            "Review analyzer findings",
            "Identify publicly accessible resources",
            "Perform unused access analysis",
          ],
          outcome:
            "Potential security risks and unused AWS resources are identified for review.",
        },
      ],
      issues: [
        "Credential report generation failed",
        "Access Analyzer configuration issues",
        "Public S3 access detected",
      ],
    },
    {
      id: 7,
      name: "Restrict IAM Access to a Specific AWS Region",
      subtitle: "Region-Based Access Control for Amazon S3",
      overview:
        "An IAM policy is created to restrict Amazon S3 operations to the us-east-1 region by denying access to all other AWS regions. The policy is attached to an IAM user along with AmazonS3FullAccess, and access keys are configured for AWS CLI. S3 operations are then tested across multiple regions to verify that access is allowed only in the permitted region.",
      objectives: [
        "Learn how to create an IAM policy that restricts S3 access to one region.",
        "Learn how to restrict AWS resource access to a specific region using policy conditions.",
        "Understand how to generate access keys for an IAM user and configure AWS CLI for authentication.",
        "Learn how to verify permissions by attempting to list S3 buckets in multiple regions.",
      ],
      services: ["IAM", "S3", "AWS CLI"],
      sections: [
        {
          title: "Create an IAM Policy for Regional Access Control",
          objective:
            "Create an IAM policy that restricts Amazon S3 access to a single AWS Region.",
          tasks: [
            "Create a custom IAM policy",
            "Configure region-based policy conditions",
            "Restrict access outside us-east-1",
          ],
          outcome:
            "An IAM policy enforces Amazon S3 access only within the specified AWS Region.",
        },
        {
          title: "Create an IAM User and Attach Policies",
          objective:
            "Create an IAM user and assign the required permissions for regional access control.",
          tasks: [
            "Create an IAM user",
            "Attach AmazonS3FullAccess",
            "Attach the regional restriction policy",
            "Generate access keys",
          ],
          outcome:
            "The IAM user is configured with region-restricted Amazon S3 permissions.",
        },
        {
          title: "Configure AWS CLI",
          objective:
            "Configure AWS CLI using the IAM user's access credentials.",
          tasks: [
            "Configure AWS CLI",
            "Verify user identity",
            "Set the default AWS Region",
          ],
          outcome:
            "AWS CLI is authenticated and ready to access AWS resources.",
        },
        {
          title: "Verify Region-Based Access Restrictions",
          objective:
            "Validate that Amazon S3 operations are allowed only in the permitted AWS Region.",
          tasks: [
            "List Amazon S3 buckets in us-east-1",
            "Attempt to list buckets in us-west-2",
            "Create a bucket in us-east-1",
            "Attempt to create a bucket in us-west-2",
          ],
          outcome:
            "Amazon S3 operations succeed only in the allowed AWS Region and are denied elsewhere.",
        },
      ],
      issues: [
        "Region restriction policy misconfigured",
        "Access keys configured incorrectly",
        "Access denied outside allowed region",
      ],
    },
  ];

  const [search, setSearch] = React.useState("");
  const [selectedLab, setSelectedLab] = React.useState(labs[0]);
  const filteredLabs = labs.filter((lab) =>
    lab.name.toLowerCase().includes(search.toLowerCase()),
  );
  const [expandedSection, setExpandedSection] = React.useState(null);

  return (
    <div className="labs-page main-section">
      <div className="labs-header">
        <h2>IAM Labs</h2>

        <p className="labs-description">
          Learn AWS Identity and Access Management through guided deep dive
          laboratories. Select a lab below to explore objectives, AWS services,
          lab sections, and common troubleshooting guidance.
        </p>
      </div>

      <div className="labs-search">
        <input
          className="labs-search-input"
          type="text"
          placeholder="Search IAM labs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="labs-accordion">
  {filteredLabs.map((lab) => {
    const expanded = selectedLab.id === lab.id;

    return (
      <div key={lab.id} className="labs-accordion-item">
        <button
          className="labs-accordion-header"
          onClick={() => {
            if (expanded) {
              setSelectedLab({ id: -1 });
            } else {
              setSelectedLab(lab);
              setExpandedSection(null);
            }
          }}
        >
          <div>
            <div className="labs-card-title">{lab.name}</div>
            <div className="labs-card-subtitle">{lab.subtitle}</div>
          </div>

          <i
            className={
              expanded
                ? "bi bi-chevron-up"
                : "bi bi-chevron-down"
            }
          ></i>
        </button>

        {expanded && (
  <div className="labs-accordion-body">

    <div className="labs-details-header">
      <h3>{lab.name}</h3>
      <p>{lab.subtitle}</p>
    </div>

    <div className="labs-section">
      <h4>Overview</h4>
      <p>{lab.overview}</p>
    </div>

    <div className="labs-section">
      <h4>Learning Objectives</h4>

      <ul className="labs-list">
        {lab.objectives.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="labs-section">
      <h4>AWS Services</h4>

      <div className="labs-service-tags">
        {lab.services.map((service, index) => (
          <span key={index} className="labs-service-tag">
            {service}
          </span>
        ))}
      </div>
    </div>

    <div className="labs-section">
      <h4>Lab Sections</h4>

      <div className="labs-section-list">
        {lab.sections.map((section, index) => {
          const expandedSectionItem = expandedSection === index;

          return (
            <div
              key={index}
              className={
                expandedSectionItem
                  ? "labs-section-item expanded"
                  : "labs-section-item"
              }
            >
              <button
                className="labs-section-header"
                onClick={() =>
                  setExpandedSection(
                    expandedSectionItem ? null : index
                  )
                }
              >
                <div className="labs-section-left">
                  <span className="labs-section-number">
                    {index + 1}
                  </span>

                  <span className="labs-section-title">
                    {section.title}
                  </span>
                </div>

                <i
                  className={
                    expandedSectionItem
                      ? "bi bi-chevron-up nav-arrow"
                      : "bi bi-chevron-down nav-arrow"
                  }
                />
              </button>

              {expandedSectionItem && (
                <div className="labs-section-content">
                  <h5>Objective</h5>

                  <p>{section.objective}</p>

                  <h5>Tasks</h5>

                  <ul className="labs-list">
                    {section.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>

                  <h5>Outcome</h5>

                  <p>{section.outcome}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    <div className="labs-section">
      <h4>Common Issues</h4>

      <ul className="labs-list">
        {lab.issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
    </div>

    <div className="labs-actions">
      <button className="labs-doc-btn">
        Documentation
      </button>

      <button className="labs-launch-btn">
        Launch Lab
      </button>
    </div>

  </div>
)}
      </div>
    );
  })}
</div>

     
    </div>
  );
}
