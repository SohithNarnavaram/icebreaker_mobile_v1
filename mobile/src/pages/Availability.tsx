import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, TextInput, Modal, StyleSheet, Switch } from "react-native";
import { Calendar, Clock, MapPin, Plus, X, Edit, Trash2 } from "lucide-react-native";

interface AvailabilitySlot {
  id: number;
  time: string;
  location: string;
  status: 'Active' | 'Inactive';
}

const AvailabilityScreen = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStatus, setNewStatus] = useState<'Active' | 'Inactive'>('Active');

  const availableUsers = [
    {
      id: 1,
      name: "Priya Singh",
      age: 26,
      time: "Today, 4:00 PM",
      location: "Thirdwave Coffee, Koramangala",
      interests: ["Startup", "Tech"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 28,
      time: "Tomorrow, 11:00 AM",
      location: "HSR Layout Park",
      interests: ["Fitness", "Health"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const [myAvailability, setMyAvailability] = useState<AvailabilitySlot[]>([
    { id: 1, time: "Today, 7:00 PM", location: "Cafe Coffee Day, Indiranagar", status: 'Active' },
    { id: 2, time: "Sunday, 2:00 PM", location: "Central Mall", status: 'Active' },
  ]);

  const handleRequestMeetup = (userName: string) => {
    console.log(`Request sent to ${userName}`);
  };

  const handleEditSlot = (slot: AvailabilitySlot) => {
    setEditingSlot(slot);
    setNewDate(slot.time);
    setNewLocation(slot.location);
    setNewStatus(slot.status);
    setShowEditModal(true);
  };

  const handleDeleteSlot = (slotId: number) => {
    setMyAvailability(myAvailability.filter(slot => slot.id !== slotId));
  };

  const handleSaveChanges = () => {
    if (editingSlot && newDate && newLocation) {
      setMyAvailability(myAvailability.map(slot => 
        slot.id === editingSlot.id 
          ? { ...slot, time: newDate, location: newLocation, status: newStatus }
          : slot
      ));
      setShowEditModal(false);
      setEditingSlot(null);
      setNewDate("");
      setNewLocation("");
      setNewStatus('Active');
    }
  };

  const handleCreateAvailability = () => {
    if (newDate && newLocation) {
      const newId = Math.max(...myAvailability.map(s => s.id), 0) + 1;
      setMyAvailability([...myAvailability, { 
        id: newId, 
        time: newDate, 
        location: newLocation, 
        status: newStatus 
      }]);
      setShowCreateForm(false);
      setNewDate("");
      setNewLocation("");
      setNewStatus('Active');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Availability</Text>
          <Text style={styles.subtitle}>Schedule meetups</Text>
        </View>
        <Pressable style={styles.createButton} onPress={() => setShowCreateForm(true)}>
          <Plus size={18} color="#fff" />
          <Text style={styles.createButtonText}>Create</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>My Availability</Text>
        {myAvailability.map((slot) => (
          <View key={slot.id} style={styles.slotCard}>
            <View style={styles.slotInfo}>
              <View style={styles.slotRow}>
                <Clock size={16} color="#7856d4" />
                <Text style={styles.slotText}>{slot.time}</Text>
              </View>
              <View style={styles.slotRow}>
                <MapPin size={16} color="#9ca3af" />
                <Text style={styles.slotTextMuted}>{slot.location}</Text>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <View style={[styles.statusBadge, slot.status === 'Active' && styles.statusBadgeActive]}>
                <Text style={[styles.statusText, slot.status === 'Active' && styles.statusTextActive]}>
                  {slot.status}
                </Text>
              </View>
              <Pressable style={styles.editButton} onPress={() => handleEditSlot(slot)}>
                <Edit size={16} color="#9ca3af" />
              </Pressable>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>People Available</Text>
        {availableUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}, {user.age}</Text>
              <View style={styles.infoRow}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.infoText}>{user.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.infoText} numberOfLines={1}>{user.location}</Text>
              </View>
              <View style={styles.interestsContainer}>
                {user.interests.map((interest) => (
                  <View key={interest} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
              <Pressable style={styles.requestButton} onPress={() => handleRequestMeetup(user.name)}>
                <Text style={styles.requestButtonText}>Request</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={showCreateForm} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Availability</Text>
              <Pressable onPress={() => setShowCreateForm(false)}>
                <X size={24} color="#6b7280" />
              </Pressable>
            </View>
            <View style={styles.formContent}>
              <Text style={styles.label}>Date & Time</Text>
              <TextInput
                style={styles.input}
                value={newDate}
                onChangeText={setNewDate}
                placeholder="e.g., Today, 4:00 PM"
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={newLocation}
                onChangeText={setNewLocation}
                placeholder="e.g., Starbucks, Brigade Road"
                placeholderTextColor="#9ca3af"
              />
              <View style={styles.statusToggleContainer}>
                <Text style={styles.label}>Status</Text>
                <View style={styles.toggleWrapper}>
                  <Text style={[styles.toggleLabel, !(newStatus === 'Active') && styles.toggleLabelActive]}>
                    Active
                  </Text>
                  <Switch
                    value={newStatus === 'Active'}
                    onValueChange={(value) => setNewStatus(value ? 'Active' : 'Inactive')}
                    trackColor={{ false: '#ff3f41', true: '#7856d4' }}
                    thumbColor="#fff"
                  />
                  <Text style={[styles.toggleLabel, (newStatus === 'Active') && styles.toggleLabelActive]}>
                    Inactive
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={() => setShowCreateForm(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleCreateAvailability}>
                <Text style={styles.saveButtonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showEditModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Availability</Text>
              <Pressable onPress={() => setShowEditModal(false)}>
                <X size={24} color="#6b7280" />
              </Pressable>
            </View>
            <View style={styles.formContent}>
              <Text style={styles.label}>Date & Time</Text>
              <TextInput
                style={styles.input}
                value={newDate}
                onChangeText={setNewDate}
                placeholder="e.g., Today, 4:00 PM"
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={newLocation}
                onChangeText={setNewLocation}
                placeholder="e.g., Starbucks, Brigade Road"
                placeholderTextColor="#9ca3af"
              />
              <View style={styles.statusToggleContainer}>
                <Text style={styles.label}>Status</Text>
                <View style={styles.toggleWrapper}>
                  <Text style={[styles.toggleLabel, !(newStatus === 'Active') && styles.toggleLabelActive]}>
                    Active
                  </Text>
                  <Switch
                    value={newStatus === 'Active'}
                    onValueChange={(value) => setNewStatus(value ? 'Active' : 'Inactive')}
                    trackColor={{ false: '#ff3f41', true: '#7856d4' }}
                    thumbColor="#fff"
                  />
                  <Text style={[styles.toggleLabel, (newStatus === 'Active') && styles.toggleLabelActive]}>
                    Inactive
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.modalActions}>
              {editingSlot && (
                <Pressable style={styles.deleteButton} onPress={() => {
                  handleDeleteSlot(editingSlot.id);
                  setShowEditModal(false);
                }}>
                  <Trash2 size={16} color="#fff" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              )}
              <Pressable style={styles.cancelButton} onPress={() => setShowEditModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 46, paddingBottom: 20, backgroundColor: '#000000' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#E5E7EB', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9CA3AF' },
  createButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ff3f41', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24 },
  createButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, paddingLeft: 4, color: '#E5E7EB' },
  slotCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#0D0D0D', borderRadius: 16, borderWidth: 1, borderColor: '#2E2E2E', marginBottom: 12 },
  slotInfo: { flex: 1, gap: 8 },
  slotRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slotText: { fontSize: 14, fontWeight: '600', color: '#E5E7EB' },
  slotTextMuted: { fontSize: 14, color: '#9CA3AF' },
  userCard: { flexDirection: 'row', gap: 16, padding: 16, backgroundColor: '#0D0D0D', borderRadius: 16, borderWidth: 1, borderColor: '#2E2E2E', marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: 16 },
  userDetails: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#E5E7EB', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  infoText: { fontSize: 14, color: '#9CA3AF' },
  interestsContainer: { flexDirection: 'row', gap: 6, marginTop: 8, marginBottom: 12, flexWrap: 'wrap' },
  interestTag: { backgroundColor: '#3D0A0A', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  interestText: { fontSize: 13, color: '#ff3f41', fontWeight: '600' },
  requestButton: { backgroundColor: '#ff3f41', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-start', marginTop: 8 },
  requestButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 16 },
  modalContent: { backgroundColor: '#0D0D0D', borderRadius: 20, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#2E2E2E' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#E5E7EB' },
  formContent: { padding: 20, gap: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#E5E7EB' },
  input: { borderWidth: 1, borderColor: '#2E2E2E', borderRadius: 12, padding: 12, fontSize: 14, color: '#E5E7EB', backgroundColor: '#1A1A1A' },
  modalActions: { flexDirection: 'row', gap: 12, padding: 20, borderTopWidth: 1, borderTopColor: '#2E2E2E' },
  cancelButton: { flex: 1, padding: 12, borderWidth: 2, borderColor: '#2E2E2E', borderRadius: 12, backgroundColor: '#0D0D0D' },
  cancelButtonText: { textAlign: 'center', color: '#E5E7EB', fontWeight: '600' },
  saveButton: { flex: 1, padding: 12, backgroundColor: '#ff3f41', borderRadius: 12 },
  saveButtonText: { textAlign: 'center', color: '#fff', fontWeight: '600' },
  actionsContainer: { flexDirection: 'column', alignItems: 'flex-end', gap: 8 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: '#2E2E2E' },
  statusBadgeActive: { backgroundColor: '#0D1F17', borderWidth: 1, borderColor: '#00ff88' },
  statusText: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  statusTextActive: { color: '#00ff88' },
  editButton: { padding: 8 },
  statusToggleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleWrapper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { fontSize: 14, color: '#6b7280', fontWeight: '600' },
  toggleLabelActive: { color: '#7856d4' },
  deleteButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, backgroundColor: '#dc2626', borderRadius: 12 },
  deleteButtonText: { color: '#fff', fontWeight: '600' },
});

export default AvailabilityScreen;
