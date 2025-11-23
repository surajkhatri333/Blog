import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 mt-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
                    Terms & Conditions
                </h1>
                <p className="text-gray-600 text-center mb-10">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using this website, you agree to be bound by these Terms & Conditions.
                            If you do not agree, please discontinue using the platform immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Use of Platform</h2>
                        <p>
                            Our platform allows users to publish blogs and share content with others. You are
                            responsible for ensuring that your content does not violate any laws or rights of others.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. User Responsibilities</h2>
                        <ul className="list-disc ml-6">
                            <li>You must not publish harmful, hateful, or illegal content.</li>
                            <li>You agree not to misuse the platform for spam or malicious activity.</li>
                            <li>Any content you post remains your responsibility.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Content Ownership</h2>
                        <p>
                            You retain ownership of your content, but by posting, you grant us a non-exclusive,
                            worldwide license to display and distribute it on this platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Account Suspension</h2>
                        <p>
                            We reserve the right to suspend or block any user who violates these terms or harms
                            the platform’s community, security, or reputation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Changes to Terms</h2>
                        <p>
                            We may update these Terms at any time. Continued use of the platform means you accept the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Contact Us</h2>
                        <p>
                            If you have any questions regarding these Terms & Conditions, feel free to contact us at:
                            <br />
                            <span className="font-semibold">sharkaro@gmail.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
