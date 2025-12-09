import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useCandidatesStore } from "@/features/store/candidatesStore";
import { useUIStore } from "@/features/store/uiStore";
import type { Candidate } from "@/types";

export function MainLayout() {
  const { addCandidate, clearFilters } = useCandidatesStore();
  const { actionBoardVisible, toggleActionBoard, setShowAddCandidateModal } = useUIStore();

  const handleLogoClick = () => {
    clearFilters();
  };

  const handleSimulateChatbot = () => {
    // Generate a random candidate (simulating chatbot submission)
    const firstNames = [
      "David",
      "Sarah",
      "Michael",
      "Rachel",
      "Daniel",
      "Emma",
      "Joshua",
      "Olivia",
      "Benjamin",
      "Sophia",
    ];
    const lastNames = [
      "Cohen",
      "Levi",
      "Miller",
      "Davis",
      "Garcia",
      "Rodriguez",
      "Martinez",
      "Anderson",
      "Taylor",
      "Thomas",
    ];
    const jobTypes = [
      "headquarters_staff",
      "training_instruction",
      "sales",
      "operational_worker",
    ] as const;
    const campaigns = [
      "LinkedIn Campaign 2024",
      "Facebook Jobs Q4",
      "Indeed Premium",
      "Employee Referral",
      "University Partnership",
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    const matchScore = Math.floor(Math.random() * 35) + 40;
    const age = Math.floor(Math.random() * 25) + 22;

    const candidate: Omit<Candidate, "id"> = {
      fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `05${Math.floor(Math.random() * 9)}${Math.floor(
        Math.random() * 10000000
      )
        .toString()
        .padStart(7, "0")}`,
      age,
      citizenship: Math.random() > 0.5 ? "Israeli" : "Israeli & American",
      city: "Tel Aviv",
      jobType,
      status: "submitted",
      primaryGroup: {
        groupName: campaign,
        matchScore,
      },
      campaignSource: campaign,
      createdAt: new Date(),
      isNew: true,
      cvUrl: "https://example.com/cv-sample.pdf",
      statusHistory: [],
      alternativeGroups: [],
      matchedParameters: [],
      aiSkillsSummary: "",
      additionalInfo: [],
      notes: "",
    };

    addCandidate(candidate);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <Header
        onAddCandidate={() => setShowAddCandidateModal(true)}
        onImportExcel={() => {
          // TODO: Implement Excel import
        }}
        showActionBoard={actionBoardVisible}
        onToggleActionBoard={toggleActionBoard}
        onSimulateChatbot={handleSimulateChatbot}
        onLogoClick={handleLogoClick}
      />
      <div className="pt-14 lg:pl-[72px]">
        <Outlet />
      </div>
    </div>
  );
}

